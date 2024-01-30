import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";

interface ShopSettingsProps {
    loadSeller: any
}
const ShopSettings: React.FC<ShopSettingsProps> = ({ loadSeller }) => {
    const { seller } = useSelector((state: any) => state.seller);
    const [avatar, setAvatar] = useState<File>();
    const [name, setName] = useState(seller && seller.name);
    const [description, setDescription] = useState(
        seller && seller.description ? seller.description : ""
    );
    const [address, setAddress] = useState(seller && seller.address);
    const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
    const [zipCode, setZipcode] = useState(seller && seller.zipCode);

    const dispatch = useDispatch();


    const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()    
        const fileInput = e.target as HTMLInputElement; // Type casting to HTMLInputElement
        const file = fileInput.files?.[0];
        setAvatar(file)

        const formData = new FormData()

        formData.append("image", file)

        await axios.put(`${server}/shop/update-shop-avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", 
            }, 
            withCredentials: true
        }).then((res) => {
            dispatch(loadSeller())
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }
    // const handleImage = async (e) => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatar(reader.result);
    //             axios
    //                 .put(
    //                     `${server}/shop/update-shop-avatar`,
    //                     { avatar: reader.result },
    //                     {
    //                         withCredentials: true,
    //                     }
    //                 )
    //                 .then((res) => {
    //                     dispatch(loadSeller());
    //                     toast.success("Avatar updated successfully!");
    //                 })
    //                 .catch((error) => {
    //                     toast.error(error.response.data.message);
    //                 });
    //         }
    //     };

    //     reader.readAsDataURL(e.target.files[0]);
    // };

    const updateHandler = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        await axios
            .put(
                `${server}/shop/update-seller-info`,
                {
                    name,
                    address,
                    zipCode,
                    phoneNumber,
                    description,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Shop info updated succesfully!");
                dispatch(loadSeller());
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
                <div className="w-full flex items-center justify-center">
                    <div className="relative">
                        <img
                            // src={avatar ? avatar : `${seller.avatar?.url}`}
                            src={avatar ? avatar : `${backend_url}${seller?.avatar}`}
                            alt=""
                            className="w-[200px] h-[200px] rounded-full cursor-pointer"
                        />
                        <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={handleImage}
                            />
                            <label htmlFor="image">
                                <AiOutlineCamera />
                            </label>
                        </div>
                    </div>
                </div>

                {/* shop info */}
                <form
                    aria-aria-required={true}
                    className="flex flex-col items-center"
                    onSubmit={updateHandler}
                >
                    <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                        <div className="w-full pl-[3%]">
                            <label className="block pb-2">Shop Name</label>
                        </div>
                        <input
                            type="name"
                            placeholder={`${seller.name}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                        />
                    </div>
                    <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                        <div className="w-full pl-[3%]">
                            <label className="block pb-2">Shop description</label>
                        </div>
                        <input
                            type="name"
                            placeholder={`${seller?.description
                                ? seller.description
                                : "Enter your shop description"
                                }`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        />
                    </div>
                    <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                        <div className="w-full pl-[3%]">
                            <label className="block pb-2">Shop Address</label>
                        </div>
                        <input
                            type="name"
                            placeholder={seller?.address}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                        />
                    </div>

                    <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                        <div className="w-full pl-[3%]">
                            <label className="block pb-2">Shop Phone Number</label>
                        </div>
                        <input
                            type="number"
                            placeholder={seller?.phoneNumber}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                        />
                    </div>

                    <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                        <div className="w-full pl-[3%]">
                            <label className="block pb-2">Shop Zip Code</label>
                        </div>
                        <input
                            type="number"
                            placeholder={seller?.zipCode}
                            value={zipCode}
                            onChange={(e) => setZipcode(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                        />
                    </div>

                    <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
                        <input
                            type="submit"
                            value="Update Shop"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            readOnly
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShopSettings;