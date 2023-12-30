import { useContext, useState  } from "react";
import Modal from 'react-modal';
import { TodoContext } from "../components/providers/TodoProvider";
import { useTodoList } from "../hooks/useTodoList"

export const TodoList = () => {
  // TODO:モーダルの処理は別途カスタムフック化する
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  Modal.setAppElement('#root');

  const { todos } = useContext(TodoContext);
  const { onDeleteTodo } = useTodoList();

  const onClickDeleteTodo = () => {
    onDeleteTodo(deleteTargetId);
    closeModal();
  }

  const showDeleteAlert = (id:number) => {
    openModal();
    setDeleteTargetId(id);
  }

  if (todos.length === 0 ) return <></>
  return (
    <>
      { todos.length > 0 && (
        <div>
          {todos.map((todo) => (
            <div className="group">
              <div key={todo.id} className="group-last:border-b w-full py-1.5 px-2 border-t border-r border-l border-gray-300 rounded-md flex justify-between items-center">
                <span className="w-9/12">{todo.title}</span>
                <button
                  className="w-3/12 py-1.5 border border-red-500 rounded-md bg-red-500 text-white hover:bg-white hover:text-red-500"
                  onClick={() => showDeleteAlert(todo.id)}
                >削除</button>
              </div>
            </div>
          ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Delete Modal"
          >
            <p className="mb-4">本当に削除してもよろしいですか？</p>
            <div className="flex justify-end">
              <button
                className="w-24 p-2 text-sm border border-blue-500 rounded-md bg-blue-500 text-white"
                onClick={onClickDeleteTodo}
              >OK</button>
              <button
                className="w-24 p-2 ml-2 text-sm border border-gray-200 rounded-md text-blue-500"
                onClick={closeModal}
              >キャンセル</button>
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

// TODO:tailwindで書き換える
// 無理っぽい？
const customStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '500px',
    height: '120px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}