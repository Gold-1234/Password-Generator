import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { isValidElement, useState } from 'react'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from 'yup'

const PassSchema = Yup.object().shape({
  passLength: Yup.number()
              .min(4, 'Password must at least be 4 characters long')
              .max(16, 'Password can be maximum 16 characters long')
              .required('Password Length is required')
})
    

export default function App2() {
    const [password, setPassword] = useState('')
    const [number, onChangeNumber] = useState('')
    const [isPassGenerated, setIsPassGenerated] = useState(false)
    const [lowercase, setLowercase] = useState(false)
    const [uppercase, setUppercase] = useState(false)
    const [numbers, setNumbers] = useState(false)
    const [symbols, setSymbols] = useState(false)

    const generatePasswordString = (passLength: number) => {
      let characterList = '';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digitChars = '0123456789';
      const specialChars = '!@#$%^&*()_=+'
    
      if(uppercase){
        characterList += uppercaseChars
      }
      if(lowercase){
        characterList += lowercaseChars
      }
      if(numbers){
        characterList += digitChars
      }
      if(symbols){
        characterList += specialChars
      }
    
      const passwordResult = createPassword(characterList, passLength)
      setPassword(passwordResult)
      setIsPassGenerated(true);    
    }
    
    const createPassword = (
      characters: string,
      passwordLength: number) => {
        let result = '';
        for(let i = 0; i < passwordLength; i++){
          const characterIndex = Math.round(Math.random() * characters.length)
          result += characters.charAt(characterIndex)
        }
        return result;
        
      }
    
      const resetPassword = () => {
        setPassword('')
        setIsPassGenerated(false)
        setLowercase(false)
        setUppercase(false)
        setNumbers(false)
        setSymbols(false)
    }
    
    return (
      <SafeAreaView style = {styles.Area}>
      <View style = {styles.primary}>
      <Text style = {styles.heading}>Password Generator</Text>
    
    <Formik
      initialValues={{passLength: ''}}
      validationSchema={PassSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit = {(values) => {
      console.log('Password Length: ', values.passLength)  
      generatePasswordString(+values.passLength)
      }}
    >
    {({handleChange, handleBlur, handleSubmit,handleReset, values, errors, touched}) => (
      <View>
      <View style = {styles.one}>
      <Text style = {styles.text}>
          Enter password length:
        </Text>
      <TextInput
        style = {styles.inputNum}
        onChangeText={handleChange('passLength')}
        onBlur={handleBlur('passLength')}
        value = {values.passLength}
        keyboardType='number-pad'
        placeholder='Ex. 8'
        placeholderTextColor='#bfbebb'
      />
      </View>
      {touched.passLength && errors.passLength && (
        <Text style = {{color: 'red', marginBottom: 10, marginLeft: 28}}>{errors.passLength}</Text>
      )}
        <View style = {styles.checkbox}>
        <View style = {styles.one}>
        <Text style = {styles.text}>
          Include UpperCase
        </Text>
      <BouncyCheckbox 
        isChecked = {uppercase}
        onPress={() => setUppercase(!uppercase)}
        fillColor='#D63484'
        />
      </View>
      <View style = {styles.one}>
       <Text style = {styles.text}>
          Include Lower Case
        </Text>
      <BouncyCheckbox isChecked = {lowercase}
        onPress={() => setLowercase(!lowercase)}
        fillColor='#D63484'/>
      </View>
      <View style = {styles.one}>
      <Text style = {styles.text}>
          Include Numbers
        </Text>
      <BouncyCheckbox 
      isChecked = {numbers}
      onPress={() => setNumbers(!numbers)}
      fillColor='#D63484'
       />
      </View>
      <View style = {styles.one}>
      <Text style = {styles.text}>
          Include Special Characters
        </Text>
      <BouncyCheckbox 
        isChecked = {symbols}
        onPress={() => setSymbols(!symbols)}
        fillColor='#D63484'
      />
      </View>
      </View>
      <View style = {styles.button}>
      <TouchableOpacity 
        onPress={() => handleSubmit()} 
        style = {styles.btn1}>
        <Text style = {{color:'#F8F4EC', fontWeight: 'bold', fontSize: 15}}>Generate Password</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={()=>{
          handleReset();
          resetPassword()
        }} 
        style = {styles.btn2}>
        <Text style = {{color:'#F8F4EC', fontWeight: 'bold', fontSize: 15}}>Reset</Text>
      </TouchableOpacity>
      </View>
      </View>
   
    )}
    </Formik>
    {isPassGenerated ? (
          <View>
            <Text style={styles.pass}>Generated Password: </Text>
            <Text selectable = {true} style={styles.password}>{password}</Text>
          </View>
        ) : null}
    </View>
    

   </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    Area:{
     
    },
    primary: {
      backgroundColor: '#402B3A',
      height: '100%',
      alignContent: 'center',
      alignItems: 'center'
      
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: '#FF9BD2',

    },
    text: {
      color: '#F8F4EC',
      margin: 20,
      fontWeight: 'bold',
      marginRight: 100
    },

    input: {
        height: 40,
        width: 300,
        borderColor: '#F8F4EC',
        borderWidth: 2,
        margin: 15,
        alignItems: 'center',
        color: '#F8F4EC',
        
    },
    inputNum: {
      height: 40,
      width: 50,
      borderColor: '#F8F4EC',
      borderWidth: 2,
      alignItems: 'center',
      color: '#F8F4EC',
      marginLeft: -30,
      marginTop: 10
      
  },
  checkbox: {
    
  },

  one:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  btn1:{
    
    backgroundColor:'#FF9BD2',
    height: 50,
    width: 250,
    borderColor:'#D63484',
    borderWidth: 5,
    borderRadius: 400,
    alignItems:'center',
    justifyContent: 'center',
    margin: 10
  },
  button: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  pass: {
    color:'#F8F4EC',
    fontWeight: 'bold', 
    fontSize: 25,
    marginTop: 20
  },
  password: {
    color:'#F8F4EC',
    fontWeight: 'bold', 
    fontSize: 20,
    marginTop: 0,
    textAlign: 'center'
  },
  btn2:{
    backgroundColor:'#FF9BD2',
    height: 50,
    width: 100,
    borderColor:'#D63484',
    borderWidth: 5,
    borderRadius: 400,
    alignItems:'center',
    justifyContent: 'center',
    margin: 10
  }
}) 