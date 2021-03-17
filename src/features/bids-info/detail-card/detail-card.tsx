import React from 'react'
import {Card, Title} from '../ui'
import {Line1px} from '../../../ui/atoms/line/line-1px'
import {Wrapper} from '../ui/atoms'
import {BidDetailSteps} from '../../bid-detail-steps'
import {ArrowTop} from '../../../ui/atoms/icons/arrow-top'
import {loadType} from '../../../api/rest/loads/types'

type propsType = {
    data: loadType | null
}

export const DetailCard: React.FC<propsType> = ({data}) => {
    return (
        <Card style={{borderRadius: 8}}>
            <Wrapper style={{paddingBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
                <Title>Details</Title>
                <ArrowTop style={{marginLeft: 6}}/>
            </Wrapper>
            <Line1px/>
            <Wrapper style={{paddingTop: 20}}>
                <BidDetailSteps isCargo={false} item={data}/>
            </Wrapper>
        </Card>
    )
}

