import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Todo } from "./domain/todo.js";
import { addTodo, deleteTodo, getAllTodos } from "./lib/todo";

export const TodoApp = ({ initialData = [] }) => {
  const [sumTime, setSumTime] = useState(0);
  const [todosData, setTodosData] = useState<Todo[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // react-hook-form
  type TodoFormData = {
    contents: string;
    time: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>();

  const updateTime = useCallback((todos: Todo[]) => {
    return todos.reduce((acc: number, cur: Todo) => acc + parseInt(cur.time, 10), 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchTodos = await getAllTodos();
        setTodosData(fetchTodos);
        setSumTime(updateTime(fetchTodos));
      } catch (error) {
        console.error("読込エラーです", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [updateTime]);

  // react-hook-form 用の onSubmit
  const onSubmit = async (data: TodoFormData) => {
    try {
      await addTodo(data.contents, Number(data.time));
      const updatedTodos = await getAllTodos();
      setTodosData(updatedTodos);
      setSumTime(updateTime(updatedTodos));
      reset();
      onClose();
    } catch (err) {
      console.error("登録に失敗しました", err);
    }
  };

  const onClickDelete = async (id: string) => {
    await deleteTodo(id);
    const updatedTodos = await getAllTodos();
    setTodosData(updatedTodos);
    setSumTime(updateTime(updatedTodos));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規登録</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {/* 学習内容 */}
              <FormControl isInvalid={!!errors.contents} mb={4}>
                <FormLabel>学習内容</FormLabel>
                <Input
                  placeholder="テキストを入力"
                  {...register("contents", { required: "学習内容は必須です" })}
                />
                <FormErrorMessage>{errors.contents?.message}</FormErrorMessage>
              </FormControl>

              {/* 学習時間 */}
              <FormControl isInvalid={!!errors.time}>
                <FormLabel>学習時間</FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  {...register("time", {
                    required: "学習時間は必須です",
                    min: { value: 1, message: "1以上を入力してください" },
                  })}
                />
                <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                登録
              </Button>
              <Button variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <div>
        <h1 data-testid="title">シン・学習記録アプリ</h1>
        <Button
          size="lg"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          rounded="xl"
          onClick={onOpen}
        >
          新規登録
        </Button>
        <ul>
          {todosData.map((todo) => (
            <li data-testid="record-item" key={todo.id}>
              <span>{todo.contents}</span>
              <span>{todo.time}時間</span>
              <button type="button" onClick={() => onClickDelete(String(todo.id))}>削除</button>
            </li>
          ))}
        </ul>
        <p>合計時間：{sumTime}/1000h</p>
      </div>
    </>
  );
};
