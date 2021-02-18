import React from 'react';
import {StyleSheet} from "react-native";
import {Card, Title} from "../ui";
import {Line1px} from "../../../ui/atoms/line/line-1px";
import {Wrapper} from "../ui/atoms";
import {BidDetailSteps} from "../../bid-detail-steps";
import {loadType} from "../../../api/rest/loads/get-loads";
import {ArrowTop} from "../../../ui/atoms/icons/arrow-top";

type propsType = {
    data:loadType
}

export const DetailCard: React.FC<propsType> = ({data}) => {
    return (
        <Card style={{borderRadius:8}}>
            <Wrapper style={{paddingBottom: 16,flexDirection:"row",alignItems:"center"}}>
                <Title>Details</Title>
                <ArrowTop style={{marginLeft:6}}/>
            </Wrapper>
            <Line1px/>
            <Wrapper style={{paddingTop:20}}>
                <BidDetailSteps isCargo={false} item={data}/>
            </Wrapper>
        </Card>
    );
};

