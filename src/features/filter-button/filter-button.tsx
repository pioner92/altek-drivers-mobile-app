import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import links from "../../../links.json";
import {FilterSVG} from "../../ui/atoms/icons";
import React from "react";
import {FilterIcon} from "../../ui/molecules/icons/filter-icon";
import {useStore} from "effector-react";
import {$isFilteredBids} from "../../../screens/filter/models";

export const FilterButton = () => {
    const navigation = useNavigation();
    const isFilteredBids = useStore($isFilteredBids)
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(links.filter)}
            style={{marginRight: 18}}>
            <FilterIcon enableBadge={isFilteredBids}/>
        </TouchableOpacity>
    )
}
