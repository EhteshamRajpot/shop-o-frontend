import React, { useState, ChangeEvent, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { categoriesData } from '../../static/data';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CreateProductProps {
    dispatch: any,
    createEvent: any
}

const CreateEvent: React.FC<CreateProductProps> = ({ dispatch, createEvent }) => {
    const { seller } = useSelector((state: any) => state.seller)
    const { success, error } = useSelector((state: any) => state.events)
    const navigate = useNavigate();

    const [images, setImages] = useState<File[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [originalPrice, setOriginalPrice] = useState<string>("");
    const [discountPrice, setDiscountPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);

        const endDateInput = document.getElementById("end-date") as HTMLInputElement | null;
        if (endDateInput) {
            endDateInput.min = minEndDate.toISOString().slice(0, 10);
        }
    };


    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);

    const minEndDate = startDate
        ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        : "";

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success("Event created successfully!");
            navigate("/dashboard-events");
            window.location.reload()
        }
    }, [dispatch, error, success])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let files: File[] = Array.from(e.target.files as FileList);
        setImages((prevImages) => [...prevImages, ...files]);

    }


    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!name || !description || !category || !startDate || !endDate) {
            // Handle the error, display a message, or prevent form submission
            return;
        }

        const newForm = new FormData();

        images.forEach((image) => {
            newForm.append("images", image);
        });

        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags || ""); // Use an empty string if tags is undefined
        newForm.append("originalPrice", originalPrice || ""); // Use an empty string if originalPrice is undefined
        newForm.append("discountPrice", discountPrice || ""); // Use an empty string if discountPrice is undefined
        newForm.append("stock", stock || ""); // Use an empty string if stock is undefined
        newForm.append("shopId", seller?._id || ""); // Use an empty string if seller._id is undefined
        newForm.append("start_Date", startDate.toISOString());
        newForm.append("Finish_Date", endDate.toISOString());

        dispatch(createEvent(newForm));
    };



    return (
        <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
            {/* create event form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your event product name..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols={30}
                        required
                        rows={8}
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your event product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Choose a category">Choose a category</option>
                        {categoriesData &&
                            categoriesData.map((i: any) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter your event product tags..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Original Price</label>
                    <input
                        type="number"
                        name="price"
                        value={originalPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Enter your event product price..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={discountPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="Enter your event product price with discount..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={stock}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter your event product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Event Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="start-date"
                        value={startDate ? startDate.toISOString().slice(0, 10) : " "}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleStartDateChange}
                        min={today}
                        placeholder="Enter your event product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Event End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="price"
                        id="end-date"
                        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleEndDateChange}
                        min={minEndDate}
                        placeholder="Enter your event product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name=""
                        id="upload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {images &&
                            images.map((i: any) => (
                                <img
                                    src={URL.createObjectURL(i)}
                                    key={i}
                                    alt=""
                                    className="h-[120px] w-[120px] object-cover m-2"
                                />
                            ))}
                    </div>
                    <br />
                    <div>
                        <input
                            type="submit"
                            value="Create"
                            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent