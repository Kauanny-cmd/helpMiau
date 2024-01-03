import React from "react";
import { Text, View } from "react-native"

import style from './style'

interface SelectProps {
  selector: string;
  selected?: boolean;
}

const Select: React.FC<SelectProps> = ({ selector,selected }) =>{
  return(
    <>
    {
      selector == '' ? 
    <></>
    :
    <View style={[style.container, selected ? style.selectedContainer : null]}>
      <Text style={[style.txtContainer, selected ? style.selectedTxt : null]}>{selector}</Text>
    </View>
    }
    </>
  )
}

export default Select;