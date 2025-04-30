type HealthConcernMap = {
    isGood: boolean;
    isCholesterol: boolean;
    isDiabetes: boolean;
    isHypertension: boolean;
    isIronDeficiency: boolean;
    isBoneResorption: boolean;
};

function getHealthConcernMap(value: string): HealthConcernMap {
    return {
        isGood: value === "good",
        isCholesterol: value === "cholesterol",
        isDiabetes: value === "diabetes",
        isHypertension: value === "hypertension",
        isIronDeficiency: value === "ironDeficiency",
        isBoneResorption: value === "boneResorption",
    };
}