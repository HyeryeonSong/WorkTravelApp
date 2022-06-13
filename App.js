import React , {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({}); // Hash Tables object
  const travel = () => setWorking(false);
  const work = () => setWorking(true); 
  const onChangeText = (payload) => setText(payload);

  const addToDo = () => {

    if(text === "") {
      return;
    }
    //ES6
    const newTodos = {
      ...todos,
    [Date.now()]: {text, work: working},
  };
    // const newTodos = Object.assign(
    //   {}, 
    //   todos, 
    //   {[Date.now()]: {text, work:working}}
    // );
    
    // save to do
    setText("");
    setTodos(newTodos);
  };
  
  console.log(todos)


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          {/* style을 object로 확장(중괄호 쓰고 앞에 ...) */}
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
          onSubmitEditing={addToDo} // todo 추가
          onChangeText={onChangeText}
          value={text} // todo 추가 후 input창 초기화
          returnKeyType="done" // go, next, search, send
          keyboardType="default"
          placeholder={working ? "할 일을 추가하세요." : "어디로 가고 싶습니까?"} style={styles.input}
        />
        <ScrollView>
          {
            Object.keys(todos).map((key) => 
              todos[key].work === working? (
                <View style={styles.todo} key={key}>
                  <Text style={styles.todoText}>{todos[key].text}</Text>
                </View>
              ) : null
            ) 
          }          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background, // theme.js 에서 가져온 속성
    paddingHorizontal: 20, //가로 padding
  },
  header:{
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText:{
    fontSize: 33,
    fontWeight: "600",
  },
  input:{
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 14,
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,

  },
  todoText:{
    color: "white",
  },
});
