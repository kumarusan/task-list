import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

export default function SingleTask({task,checked,style,onPressDelete}:{task:string;checked?:boolean;style?:object;onPressDelete:any}) {
    return (
        <TouchableOpacity style={{
            borderWidth:1,
            borderColor:'white',
            width:'95%',
            padding:5,
            borderRadius:5,
            alignSelf:"center",
            marginBottom:15
        }}
        onPress={onPressDelete}
        >
            <Text style={[style]}>
                {task}
            </Text>
        </TouchableOpacity>
    )
}