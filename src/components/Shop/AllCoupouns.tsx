import { Button } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { deleteProduct } from '../../redux/actions/product';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';

interface AllCoupounsProps {
    dispatch: any,
    getAllProductsShop: any
}

const AllCoupouns: React.FC<AllCoupounsProps> = ({ dispatch, getAllProductsShop }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [coupouns, setCoupouns] = useState<[] | null>(null);
    const [minAmount, setMinAmout] = useState<string>();
    const [maxAmount, setMaxAmount] = useState<string>();
    const [selectedProducts, setSelectedProducts] = useState<string>();
    const [value, setValue] = useState<string>("");
    const { products, success } = useSelector((state: any) => state.products)
    const { seller } = useSelector((state: any) => state.seller)

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id))
    }, [dispatch]);

    const handleDelete = (id: any) => {
        dispatch(deleteProduct(id))
        window.location.reload()
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => { }

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },

        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/product/${params.id}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => handleDelete(params.id)}
                        >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row: any[] = [];

    products &&
        products.forEach((item: any) => {
            row.push({
                id: item._id,
                name: item.name,
                price: "US$ " + item.discountPrice,
                Stock: item.stock,
                sold: item?.sold_out,
            });
        });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                            onClick={() => setOpen(true)}
                        >
                            <span className="text-white">Create Coupon Code</span>
                        </div>
                    </div>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                    {
                        open && (
                            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                                <div className="w-[90%] 800px:w-[40%] h-[97vh] bg-white rounded-md shadow p-4">
                                    <div className='w-full flex justify-end'>
                                        <RxCross1
                                            size={30}
                                            className="cursor-pointer"
                                            onClick={() => setOpen(false)}
                                        />
                                    </div>
                                    <h5 className="text-[30px] font-Poppins text-center" style={{marginTop: "-30px"}}>Create Coupoun Code</h5>
                                    {/* create coupoun code */}
                                    <form onSubmit={handleSubmit} aria-required={true}>
                                        <br />
                                        <div>
                                            <label className="pb-2">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={name}
                                                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your coupon code name..."
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="pb-2">
                                                Discount Percentenge{" "}
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="value"
                                                value={value}
                                                required
                                                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={(e) => setValue(e.target.value)}
                                                placeholder="Enter your coupon code value..."
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="pb-2">Min Amount</label>
                                            <input
                                                type="number"
                                                name="value"
                                                value={minAmount}
                                                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={(e) => setMinAmout(e.target.value)}
                                                placeholder="Enter your coupon code min amount..."
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="pb-2">Max Amount</label>
                                            <input
                                                type="number"
                                                name="value"
                                                value={maxAmount}
                                                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={(e) => setMaxAmount(e.target.value)}
                                                placeholder="Enter your coupon code max amount..."
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="pb-2">Selected Product</label>
                                            <select
                                                className="w-full mt-2 border h-[35px] rounded-[5px]"
                                                value={selectedProducts}
                                                onChange={(e) => setSelectedProducts(e.target.value)}
                                            >
                                                <option value="Choose your selected products">
                                                    Choose a selected product
                                                </option>
                                                {products &&
                                                    products.map((i: any) => (
                                                        <option value={i.name} key={i.name}>
                                                            {i.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <br />
                                        <div>
                                            <input
                                                type="submit"
                                                value="Create"
                                                className="block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    );
};

export default AllCoupouns;