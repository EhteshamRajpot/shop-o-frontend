import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../server';

interface Category {
    id: number,
    title: string,
    subTitle: string,
    image_Url: string
}

interface DropDownProps {
    categoriesData: Category[];
    setDropDown: Dispatch<SetStateAction<boolean>>;
}

const DropDown: React.FC<DropDownProps> = ({ categoriesData, setDropDown }) => {
    const navigate = useNavigate();

    const submitHandle = (i: Category) => {
        navigate(`/products?category=${i.title}`);
        setDropDown(false);
        window.location.reload();
    }
    return (
        <>
            <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
                {categoriesData &&
                    categoriesData.map((i: Category, index: number) => (
                        <div
                            key={index}
                            className={`${styles.noramlFlex}`}
                            onClick={() => submitHandle(i)}
                        >
                            <img
                                src={i.image_Url}
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    objectFit: "contain",
                                    marginLeft: "10px",
                                    userSelect: "none",
                                }}
                                alt=""
                            />
                            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default DropDown