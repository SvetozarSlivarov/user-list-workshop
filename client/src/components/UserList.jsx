import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import UserListItem from "./UserListItem";
import userService from "../services/userService.js";
import UserCreate from "./UserCreate.jsx";
import UserInfo from "./UserInfo.jsx";
import UserDelete from "./UserDelete.jsx";
import UserEdit from "./UserEdit.jsx";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [userIdInfo, setUserIdInfo] = useState(null); 
    const [userIdDelete, setUserIdDelete] = useState(null);
    const [userIdEdit, setUserIdEdit] = useState(null);

    useEffect(() => {
        userService.getAll()
            .then(result => {
                setUsers(result);
            })

    }, []);

    const createUserClickHandler = () => {
        setShowCreate(true);
    }
    const closeCreateUserClickHandler = () => {
        setShowCreate(false);
    }
    const saveCreateUserHandler = async (e) => {
        //! Stop default refresh behaviour
        e.preventDefault();
        //! Get form data
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData)
        console.log(formValues);
        //! Create new user an server
        const newUser = await userService.create(formValues);
        console.log(newUser);
        //!update local state
        setUsers(state => [...state, newUser]);
        //! close modal
        setShowCreate(false);
    }
    const userInfoClickHandler = (userId) => {
        setUserIdInfo(userId);
    };
    const userDeleteClickHandler = (userId) => {
        setUserIdDelete(userId);
    };
    const userInfoCloseHandler = () => {
        setUserIdInfo(null);
    }
    const userDeleteCloseHnadler = () => {
        setUserIdDelete(null);
    }
    const userDeleteHandler = async () => {
        //! Delete request to server
        await userService.delete(userIdDelete);

        //!Delete fron local state
        setUsers(state => state.filter(user => user._id !== userIdDelete))
        //!Close modal
        setUserIdDelete(null);
    }
    const userEditClickHandler = (userId) => {
        setUserIdEdit(userId);
    }
    const userEditCloseHandler = () => {
        setUserIdEdit(null);
    }
    const saveEditUserHandler = async (e) => {
        const userId = userIdEdit
        //! Stop default refresh behaviour
        e.preventDefault();
        //! Get form data
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData)
        console.log(userData);
        //! Create new user an server
        const updatedUser = await userService.update(userId ,userData);
        console.log(updatedUser);
        //!update local state
        setUsers(state => state.map(user => user._id === userId ? updatedUser: user))
        //! close modal
        setUserIdEdit(null);
    }

    
    return (
        <section className="card users-container">
            <Search />
            {showCreate && 
                (<UserCreate 
                    onClose={closeCreateUserClickHandler}
                    onSave={saveCreateUserHandler}
                />)     
            }
            {userIdInfo && 
                (<UserInfo 
                    userId = {userIdInfo}
                    onClose= {userInfoCloseHandler}
                />
            )}
            {userIdDelete &&
                (<UserDelete
                    onClose = {userDeleteCloseHnadler}
                    onDelete = {userDeleteHandler}
                />
            )}
            {userIdEdit &&
                (<UserEdit
                    onClose = {userEditCloseHandler}
                    onSave = {saveEditUserHandler}
                    userId = {userIdEdit}
                />
            )}
            <div className="table-wrapper">
                {/* <div className="overlay">
                        <div className="backdrop"></div>
                        <div className="modal">
                            <div className="detail-container">
                                <header className="headers">
                                    <h2>User Detail</h2>
                                    <button className="btn close">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                            className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path fill="currentColor"
                                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                            </path>
                                        </svg>
                                    </button>
                                </header>
                                <div className="content">
                                    <div className="image-container">
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""
                                            className="image" />
                                    </div>
                                    <div className="user-details">
                                        <p>User Id: <strong>62bb0c0eda039e2fdccba57b</strong></p>
                                        <p>
                                            Full Name:
                                            <strong> Peter Johnson </strong>
                                        </p>
                                        <p>Email: <strong>peter@abv.bg</strong></p>
                                        <p>Phone Number: <strong>0812345678</strong></p>
                                        <p>
                                            Address:
                                            <strong> Bulgaria, Sofia, Aleksandar Malinov 78 </strong>
                                        </p>

                                        <p>Created on: <strong>Wednesday, June 28, 2022</strong></p>
                                        <p>Modified on: <strong>Thursday, June 29, 2022</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                    {/* <!-- Create/Edit Form component  --> */}
                    


                    {/* <!-- Delete user component  --> */}
                    {/* <div className="overlay">
                        <div className="backdrop"></div>
                        <div className="modal">
                            <div className="confirm-container">
                                <header className="headers">
                                    <h2>Are you sure you want to delete this account?</h2>
                                    <button className="btn close">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                            className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path fill="currentColor"
                                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                            </path>
                                        </svg>
                                    </button>
                                </header>
                                <div className="actions">
                                    <div id="form-actions">
                                        <button id="action-save" className="btn" type="submit">Delete</button>
                                        <button id="action-cancel" className="btn" type="button">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* <!-- Overlap components  --> */}

                {/* <!-- <div className="loading-shade"> -->
                                <!-- Loading spinner  -->
                                <!-- <div className="spinner"></div> --> */}
                {/* No users added yet */}

                {/* <div className="table-overlap">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="triangle-exclamation"
                                        className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                                        ></path>
                                    </svg>
                                    <h2>There is no users yet.</h2>
                                </div> */}

                {/* <!-- No content overlap component  --> */}

                {/* <div className="table-overlap">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="triangle-exclamation"
                                        className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                                        ></path>
                                    </svg>
                                    <h2>Sorry, we couldn't find what you're looking for.</h2>
                                </div> */}

                {/* <!-- On error overlap component  --> */}

                {/* <div className="table-overlap">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="triangle-exclamation"
                className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                ></path>
              </svg>
              <h2>Failed to fetch</h2>
            </div>
        </div> */}

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => < UserListItem 
                            key={user._id} 
                            onInfoClick = {userInfoClickHandler}
                            onDeleteClick = {userDeleteClickHandler}
                            onEditClick = {userEditClickHandler}
                            {...user}/>)}
                        
                    </tbody>
                </table>
            </div>

            <button className="btn-add btn" onClick={createUserClickHandler}>Add new user</button>

            < Pagination />
        </section>
    );
}