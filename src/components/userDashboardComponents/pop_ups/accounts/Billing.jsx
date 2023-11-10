import React, { useEffect, useState } from "react";
import FieldBorder from "../../../shared_components/InputField2";
import axios from "axios";
import { toast } from "react-toastify";

const Billing = () => {
  const [banks, setBanks] = useState(null);
  const [bankCode, setBankCode] = useState(null);

  const getBanks = async () => {
    try {
      const response = await axios.get(
        "https://api.paystack.co/bank?currency=GHS",
        {
          // params: {
          //   currency: 'NGN'
          // },
          headers: {
            Authorization: `Bearer pk_test_344e58dfe938efd0479aa493792f7f7a0d800042`,
          },
        }
      );

      console.log("response", response);
      setBanks(response?.data.data);
    } catch (error) {
      toast.error("Error");
      console.log("Error:", error);
    }
  };

  const verifyBankAccount = async () => {
    try {
      const response = await axios.get(`https://api.paystack.co/bank/resolve`, {
        params: {
          account_number: "0001234567",
          bank_code: "058",
        },
        headers: {
          Authorization: `Bearer pk_test_344e58dfe938efd0479aa493792f7f7a0d800042`,
        },
      });

      console.log("validate", response);
    } catch (error) {
      toast.error("Error");
      console.log("Error:", error);
    }
  };

  const createTransferAccount = async () => {
    try {
      const response = await axios.get(`https://api.paystack.co/bank/resolve`, {
        params: {
          type: "ghipss",
          name: "",
          account_number: "",
          bank_code: bankCode,
          currency: "GHS",
        },
        headers: {
          Authorization: `Bearer pk_test_344e58dfe938efd0479aa493792f7f7a0d800042`,
        },
      });

      console.log("createTransferAccount", response);
    } catch (error) {
      toast.error("Error");
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getBanks();
  }, []);
  // useEffect(() => {
  //   verifyBankAccount();
  // }, [bankCode]);

  return (
    <div className="m-6 rounded">
      <h4 className="text-egreen font-bold text-[2rem] text-right">Billing</h4>
      <div className="border-[0.5px] border-bgrey rounded-xl py-[1.5rem] px-5 flex flex-col gap-[1.2rem] my-4">
        <h4 className="text-[1.2rem] font-[400]">Payment Method</h4>
        <h4 className="text-[0.9rem] font-[100]">
          Update your billing <br /> details and addresss
        </h4>

        <div className="flex flex-col gap-3 lg:gap-2">
          <label className="font-[100] text-[1rem]">Select bank</label>
          <select
            name=""
            id=""
            className="outline-none bg-[#000] border-bgrey border-[0.5px] rounded-md text-[0.9rem]  py-2 px-4 placeholder:text-bgrey    text-[#fff]"
            onChange={async (e) => {
              console.log("e.target.value", JSON.parse(e.target.value).code);
              await setBankCode(JSON.parse(e.target.value).code);
            }}
          >
            {banks?.map((item, index) => {
              return (
                <option key={index} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <FieldBorder
          label={"Card Number"}
          placeholder={"0000 0000 0000 0000"}
        />

        <span className="flex flex-col justify-between gap-2 md:flex-row">
          <FieldBorder label={"Valid Until"} placeholder={"MM/YY"} />
          <FieldBorder label={"CVC"} placeholder={"123"} />
        </span>

        <FieldBorder label={"Card holder"} placeholder={"John Doe"} />

        <FieldBorder
          label={"Email Address"}
          placeholder={"johndoe@example.com"}
        />

        <button className="border-[#fff]  font-[400] rounded-md text-center border-[1px] px-2 py-2">
          Update
        </button>
      </div>
    </div>
  );
};

export default Billing;
