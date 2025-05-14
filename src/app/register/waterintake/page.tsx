"use client";
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { apiRequest } from "@/utils/api/ApiRequest";
import { useDispatch, useSelector} from "react-redux";
import { updateUser } from "../redux/userSlice";
import { RootState } from "../redux/store";

const waterintake = () => {
    const [waterintake, setWaterIntake] = useState<number>(0);
    const [validationError, setValidationError] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch();

    const userData = useSelector((state: RootState) => state.user);

    const handleOptionSelect = async (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setWaterIntake(Number(selectedValue));

        try {
            await validationSchema.validate({ waterintake: Number(selectedValue) });
            dispatch(updateUser({ waterintake: selectedValue }));
            setValidationError("");

            const updatedUserData = { ...userData, waterintake: selectedValue };
            console.log('userData:', userData);
            console.log('updatedUserData:', updatedUserData);

            await apiRequest({
                endpoint: "http://localhost:8080/api/user/register-complete",
                bodyData: updatedUserData,
                router,
                successRoute: "/home",
            });

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                setValidationError(error.message);
            } else {
                console.error("API request failed:", error);
            }
        }
    };

    const handleBack = () => {
        router.push('/register/sleepingpatterns');
    };

    const validationSchema = yup.object().shape({
        waterintake: yup
            .number()
            .required("Please select an option")
            .typeError("Please select an option")
            .min(0, "Please select an option"),
    });

    return (
        <div className="flex center mt-10">
            <Question
                title="Daily Water Intake"
                description="How many glasses of water do you drink per day?"
                options={[
                    {
                        label: "0-4 glasses",
                        value: "4",
                        isSelected: waterintake === 4,
                    },
                    {
                        label: "4-6 glasses",
                        value: "5",
                        isSelected: waterintake === 5,
                    },
                    {
                        label: "6-8 glasses",
                        value: "7",
                        isSelected: waterintake === 7,
                    },
                    {
                        label: "8+ glasses",
                        value: "8",
                        isSelected: waterintake === 8,
                    },
                ]}
                onOptionSelect={handleOptionSelect}
                onBack={handleBack}
                error={validationError}
            />
        </div>
    );
};

export default waterintake;