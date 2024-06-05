import { formatNum } from "@/lib/utils";
import { TextStyle } from "react-native"

import { Text } from "./Themed";

interface TimeElementProps {
    date: Date, 
    type?:string
    style?: TextStyle
}

export default function TimeElement({date, type, style}: TimeElementProps){
    const second = 1000;
    const minute = second*60;
    const hour = minute*60
    const day = hour*24
    const prefix = type == 'toDo' ? 'za ' : ''
    const suffix = type == 'created' ?  ' temu' : ''
    const dateTime = new Date().getTime()
    const gotTime : number = new Date(date).getTime()

    return (
        <Text style={style}>
            {dateTime-gotTime>=day*31 ? 
                `${date.getDate().toString().padStart(2,"0")}.${(date.getMonth()+1).toString().padStart(2,"0")}.${(date.getFullYear().toString()).padStart(4,"0")} ${(date.getHours().toString()).padStart(2,"0")}:${(date.getMinutes().toString()).padStart(2,"0")}`
            : 
            dateTime-gotTime>=day ? 
                `${prefix + Math.floor((dateTime-gotTime)/day)} ${(Math.floor((dateTime-gotTime)/day)) == 1 ? 'dzień': 'dni' + suffix}`
            :
            dateTime-gotTime>=hour ?
                `${prefix + Math.floor((dateTime-gotTime)/hour)} ${formatNum(Math.floor((dateTime-gotTime)/hour),'godzin') + suffix}`
            :
            dateTime-gotTime>=minute ?
                `${prefix + Math.floor((dateTime-gotTime)/minute)} ${formatNum(Math.floor((dateTime-gotTime)/minute), 'minut') + suffix}`
            :
            dateTime-gotTime>=second ?
                `${prefix + Math.floor((dateTime-gotTime)/second)} ${formatNum(Math.floor((dateTime-gotTime)/second), 'sekund') + suffix}`
            :
                `${prefix + 'mniej niż sekundę' + suffix}`
            }
        </Text>

    )
}