/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

const App = () => {
  let [text, setText] = useState('');
  let [result, setResult] = useState('');

  const buttonPressed = txt => {
    // console.log(text);
    if (txt === '=') {
      return validate() && calculateResult();
    }
    setText(text + txt);
  };

  const validate = () => {
    const txt = text;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  };
  const calculateResult = () => {
    const txt = text;
    setResult(eval(txt));
  };
  let operations = ['DEL', '+', '-', '*', '/'];
  const operate = operation => {
    switch (operation) {
      case 'DEL':
        const txt = text.split('');
        txt.pop();
        setText(txt.join(''));
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = text.split('').pop();
        if (operations.indexOf(lastChar) > 0) return;
        if (text == '') return;
        setText(text + operation);
    }
  };

  let rows = [];
  let nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['.', 0, '='],
  ];
  for (let i = 0; i < nums.length; i++) {
    let row = [];
    for (let j = 0; j < nums[i].length; j++) {
      row.push(
        <TouchableOpacity
          key={nums[i][j]}
          style={styles.btn}
          onPress={() => buttonPressed(nums[i][j])}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>,
      );
    }
    rows.push(<View style={styles.row}>{row}</View>);
  }

  let ops = [];
  for (let i = 0; i < operations.length; i++) {
    ops.push(
      <TouchableOpacity
        key={operations[i]}
        style={styles.btn}
        onPress={() => operate(operations[i])}>
        <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{text}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{result}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
      <View style={styles.builder}>
        <Text style={styles.buildText}>Built by Deevanshu Kumawat</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  result: {
    flex: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 40,
    color: 'black',
  },
  calculation: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 30,
    color: 'white',
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 40,
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row',
  },
  white: {color: 'white'},
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
  },
  builder: {
    flex: 0.5,
    justifyContent: 'center',
    alignitems: 'stretch',
  },
  buildText: {
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default App;
