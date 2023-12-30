import { useContext, useState } from "react";
import Modal from 'react-modal';
import { TodoContext } from "../components/providers/TodoProvider";
import { useTodoList } from "../hooks/useTodoList"

export const TodoList = () => {
  // モーダルの処理
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ deleteTargetId, setDeleteTargetId ] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  Modal.setAppElement('#root');

  const { todos } = useContext(TodoContext);
  const { onDeleteTodo, onEditTodo, onChageEditText, onChangeStatus } = useTodoList();

  const onClickDeleteTodo = () => {
    onDeleteTodo(deleteTargetId);
    closeModal();
  }
  // 削除時のモーダル
  const showDeleteModal = (id:number) => {
    openModal();
    setDeleteTargetId(id);
  }

  // 編集・保存ボタンのスタイル
  const editButtonStyle = "w-2/12 py-1.5 mr-1 border border-blue-400 rounded-md bg-blue-400 text-white hover:bg-white hover:text-blue-400"
  const saveButtonStyle = "w-2/12 py-1.5 mr-1 border border-indigo-500 rounded-md bg-indigo-500 text-white hover:bg-white hover:text-indigo-500"

  if (todos.length === 0 ) return <></>
  return (
    <>
      { todos.length > 0 && (
        <div className="group">
          {todos.map((todo) => (
            <div key={todo.id} className="group-last:border-b w-full py-1.5 px-2 border-t border-r border-l border-gray-300 rounded-md flex justify-between items-center">
              <input type="checkbox" className="mr-2 border border-red-500" onChange={() => onChangeStatus(todo.id)} />
              <input
                type="text"
                className="w-8/12 p-2 mr-2 border rounded-md disabled:bg-gray-100" 
                value={todo.isEdit ? todo.editTitle : todo.title} 
                disabled={!todo.isEdit} 
                onChange={(event)=>{ onChageEditText(event, todo.id)}}
              />
              <button
                className={ todo.isEdit ? saveButtonStyle : editButtonStyle }
                onClick={()=> onEditTodo(todo.id)}
              >{todo.isEdit ? "保存" : "編集"}</button>
              <button
                className="w-2/12 py-1.5 border border-red-500 rounded-md bg-red-500 text-white hover:bg-white hover:text-red-500"
                onClick={() => showDeleteModal(todo.id)}
              >削除</button>
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