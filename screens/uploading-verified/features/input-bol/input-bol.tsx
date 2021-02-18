import React from 'react';
import {Input} from "../../../../src/ui/atoms/input";
import {useStore} from "effector-react";
import {$inputValueBol, setInputValueBol} from "./models";
import {WhiteCard} from "../../../../src/ui/atoms/card/white-card";

export const InputBol: React.FC = () => {
    const value = useStore($inputValueBol)

    return (
        <WhiteCard>
            <Input value={value} onChange={setInputValueBol} placeholder='BOL'/>
        </WhiteCard>
    );
};
