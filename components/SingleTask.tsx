import { Text, TouchableOpacity, View } from "react-native";

export default function SingleTask({task,checked, style}:{task:string;checked?:boolean;style?:object}) {
    return (
        <TouchableOpacity style={{
            borderWidth:1,
            borderColor:'white',
            width:'95%',
            padding:5,
            borderRadius:5,
            alignSelf:"center",
            marginBottom:15
        }}>
            <Text style={[style]}>
                {task}
            </Text>
        </TouchableOpacity>
    )
}