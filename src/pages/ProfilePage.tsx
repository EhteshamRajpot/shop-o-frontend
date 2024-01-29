import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header.tsx';
import ProfileSideBar from "../components/Profile/ProfileSidebar.tsx";
import ProfileContent from "../components/Profile/ProfileContent.tsx";
import { useSelector } from 'react-redux';
import styles from '../styles/styles.tsx';
import { useNavigate } from 'react-router-dom';
import { deleteUserAddress, updatUserAddress, updateUserInformation } from '../redux/actions/user.tsx';
import { getAllOrdersOfUser } from '../redux/actions/order.tsx';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { loading, isAuthenticated } = useSelector((state: any) => state.user);
    const [active, setActive] = useState(1);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated])

    return (
        <div>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <>
                    <Header activeHeading='' />
                    <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                            <ProfileSideBar active={active} setActive={setActive} />
                        </div>
                        <ProfileContent
                            active={active}
                            updatUserAddress={updatUserAddress}
                            deleteUserAddress={deleteUserAddress}
                            getAllOrdersOfUser={getAllOrdersOfUser}
                            updateUserInformation={updateUserInformation}
                        />
                    </div>
                    <div style={{ marginBottom: "70px" }}></div>
                </>
            )}
        </div>
    )
}

export default ProfilePage