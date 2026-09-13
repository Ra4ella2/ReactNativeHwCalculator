import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { useState } from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';


type CalculatorButtonProps = {
  text?: string;
  color?: 'dark' | 'light' | 'orange';
  icon?: boolean;
  onPress: () => void;
};

function CalculatorButton({
  text,
  color = 'dark',
  icon = false,
  onPress,
}: CalculatorButtonProps) {
  return (
    <Pressable
      onPress={onPress}

      style={({ pressed }) => [
        styles.button,

        color === 'dark' && styles.darkButton,
        color === 'light' && styles.lightButton,
        color === 'orange' && styles.orangeButton,

        pressed && styles.pressedButton,
      ]}
    >

      {icon ? (
        <MaterialCommunityIcons
          name="backspace-outline"
          size={32}
          color="#ffffff"
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            color === 'light' && styles.lightButtonText,
          ]}
        >
          {text}
        </Text>
      )}

    </Pressable>
  );
}


export default function Index() {

  const [task, setTask] = useState<string>('');
  const [history, setHistory] = useState<string>('');

  const [justSolved, setJustSolved] = useState(false);

  function normalizeTask(value: string) {
    return value
      .replaceAll('÷', '/')
      .replaceAll('×', '*')
      .replaceAll(',', '.');
  }

  function solveTask(value: string) {
    const newTask = normalizeTask(value);

    const answer = eval(newTask);

    return answer;
  }

  function formatNumber(value: number) {
    return String(value).replace('.', ',');
  }

  const clickNumber = (number: string): void => {
    
    if (justSolved || task === 'Error') {
      setTask(number);
      setHistory('');
      setJustSolved(false);

      return;
    }

    setTask(task + number);
  };

  const clickAC = (): void => {
    setTask('');
    setHistory('');
    setJustSolved(false);
  };

  const clickBackspace = (): void => {

    if (task === 'Error') {
      clickAC();

      return;
    }

    setTask(task.slice(0, -1));

    setHistory('');
    setJustSolved(false);
  };

  const clickOperator = (
    operator: '+' | '-' | '×' | '÷'
  ): void => {

    if (task === 'Error') {
      return;
    }

    if (task.length === 0) {

      if (operator === '-') {
        setTask('-');
      }

      return;
    }

    const lastSymbol = task[task.length - 1];

    if (
      lastSymbol === '+' ||
      lastSymbol === '-' ||
      lastSymbol === '×' ||
      lastSymbol === '÷'
    ) {
      setTask(
        task.slice(0, -1) + operator
      );
    }
    else {
      setTask(task + operator);
    }


    setHistory('');
    setJustSolved(false);
  };


  const clickComma = (): void => {

    if (justSolved || task === 'Error') {
      setTask('0,');
      setHistory('');
      setJustSolved(false);

      return;
    }

    const parts = task.split(
      /[+\-×÷]/
    );

    const lastNumber =
      parts[parts.length - 1];

    if (lastNumber.includes(',')) {
      return;
    }

    if (lastNumber === '') {
      setTask(task + '0,');
    }
    else {
      setTask(task + ',');
    }


    setHistory('');
    setJustSolved(false);
  };


  const clickPlusMinus = (): void => {

    if (
      task.length === 0 ||
      task === 'Error'
    ) {
      return;
    }

    const match = task.match(
      /(\d+(?:[.,]\d+)?)$/
    );


    if (!match) {
      return;
    }


    const number = match[1];

    const start =
      match.index ?? 0;

    const beforeNumber =
      task.slice(0, start);


    if (beforeNumber.endsWith('-')) {

      const withoutMinus =
        beforeNumber.slice(0, -1);

      const previousSymbol =
        withoutMinus.slice(-1);

      const unaryMinus =
        withoutMinus === '' ||
        previousSymbol === '+' ||
        previousSymbol === '-' ||
        previousSymbol === '×' ||
        previousSymbol === '÷';


      if (unaryMinus) {
        setTask(
          withoutMinus + number
        );
      }

      else {
        setTask(
          withoutMinus +
          '+' +
          number
        );
      }


      setHistory('');
      setJustSolved(false);

      return;
    }

    if (beforeNumber.endsWith('+')) {

      setTask(
        beforeNumber.slice(0, -1) +
        '-' +
        number
      );


      setHistory('');
      setJustSolved(false);

      return;
    }

    setTask(
      beforeNumber +
      '-' +
      number
    );


    setHistory('');
    setJustSolved(false);
  };

  const clickPercent = (): void => {

    if (
      task.length === 0 ||
      task === 'Error'
    ) {
      return;
    }

    const match = task.match(
      /(\d+(?:[.,]\d+)?)$/
    );


    if (!match) {
      return;
    }


    const numberString =
      match[1];


    const number =
      Number(
        numberString.replace(',', '.')
      );


    const start =
      match.index ?? 0;

    const beforeNumber =
      task.slice(0, start);


    const operator =
      beforeNumber.slice(-1);


    let percentValue =
      number / 100;

    if (
      operator === '+' ||
      operator === '-'
    ) {

      const leftExpression =
        beforeNumber.slice(0, -1);


      if (leftExpression.length > 0) {

        try {

          const baseValue =
            solveTask(leftExpression);


          percentValue =
            baseValue *
            number /
            100;

        }
        catch {
          return;
        }

      }

    }

    const newNumber =
      formatNumber(percentValue);


    setTask(
      task.slice(0, start) +
      newNumber
    );


    setHistory('');
    setJustSolved(false);
  };

  const clickEqual = (): void => {

    if (
      task.length === 0 ||
      task === 'Error'
    ) {
      return;
    }


    const lastSymbol =
      task[task.length - 1];

    if (
      lastSymbol === '+' ||
      lastSymbol === '-' ||
      lastSymbol === '×' ||
      lastSymbol === '÷'
    ) {
      return;
    }


    try {

      const currentTask =
        task;


      const answer =
        solveTask(currentTask);


      setHistory(currentTask);

      setTask(
        formatNumber(answer)
      );

      setJustSolved(true);

    }
    catch {

      setHistory('');

      setTask('Error');

      setJustSolved(true);
    }
  };

  return (
    <View style={styles.screen}>

      <View style={styles.phone}>

        <View style={styles.statusBar}>

          <Text style={styles.time}>
            09:41
          </Text>


          <Image
            source={require('../../assets/images/icon1.jpg')}
            style={styles.statusImage}
            resizeMode="contain"
          />

        </View>

        <View style={styles.topButtons}>

          <View style={styles.smallRoundButton}>
            <Feather
              name="list"
              size={23}
              color="#ffffff"
            />
          </View>


          <View style={styles.smallRoundButton}>
            <Ionicons
              name="calculator-outline"
              size={22}
              color="#ffffff"
            />
          </View>

        </View>

        <View style={styles.display}>

          <Text
            style={styles.example}
            numberOfLines={1}
          >
            {history}
          </Text>


          <Text
            style={styles.answer}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {task || '0'}
          </Text>

        </View>

        <View style={styles.keyboard}>

          <View style={styles.row}>

            <CalculatorButton
              color="light"
              icon={true}
              onPress={clickBackspace}
            />


            <CalculatorButton
              text="AC"
              color="light"
              onPress={clickAC}
            />


            <CalculatorButton
              text="%"
              color="light"
              onPress={clickPercent}
            />


            <CalculatorButton
              text="÷"
              color="orange"
              onPress={() =>
                clickOperator('÷')
              }
            />

          </View>

          <View style={styles.row}>

            <CalculatorButton
              text="7"
              onPress={() =>
                clickNumber('7')
              }
            />


            <CalculatorButton
              text="8"
              onPress={() =>
                clickNumber('8')
              }
            />


            <CalculatorButton
              text="9"
              onPress={() =>
                clickNumber('9')
              }
            />


            <CalculatorButton
              text="×"
              color="orange"
              onPress={() =>
                clickOperator('×')
              }
            />

          </View>

          <View style={styles.row}>

            <CalculatorButton
              text="4"
              onPress={() =>
                clickNumber('4')
              }
            />


            <CalculatorButton
              text="5"
              onPress={() =>
                clickNumber('5')
              }
            />


            <CalculatorButton
              text="6"
              onPress={() =>
                clickNumber('6')
              }
            />


            <CalculatorButton
              text="−"
              color="orange"
              onPress={() =>
                clickOperator('-')
              }
            />

          </View>

          <View style={styles.row}>

            <CalculatorButton
              text="1"
              onPress={() =>
                clickNumber('1')
              }
            />


            <CalculatorButton
              text="2"
              onPress={() =>
                clickNumber('2')
              }
            />


            <CalculatorButton
              text="3"
              onPress={() =>
                clickNumber('3')
              }
            />


            <CalculatorButton
              text="+"
              color="orange"
              onPress={() =>
                clickOperator('+')
              }
            />

          </View>

          <View style={styles.row}>


            {/* +/- */}

            <Pressable
              onPress={clickPlusMinus}

              style={({ pressed }) => [
                styles.button,
                styles.darkButton,

                pressed &&
                styles.pressedButton,
              ]}
            >
              <Image
                source={require('../../assets/images/icon2.png')}
                style={styles.plusMinusImage}
                resizeMode="contain"
              />
            </Pressable>


            <CalculatorButton
              text="0"
              onPress={() =>
                clickNumber('0')
              }
            />


            <CalculatorButton
              text=","
              onPress={clickComma}
            />


            <CalculatorButton
              text="="
              color="orange"
              onPress={clickEqual}
            />

          </View>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,

    backgroundColor: '#2b2b2b',

    alignItems: 'center',
    justifyContent: 'center',
  },


  phone: {
    width: 430,
    height: 932,

    backgroundColor: '#000000',

    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 18,
  },


  statusBar: {
    width: 310,
    height: 30,

    alignSelf: 'center',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  time: {
    color: '#ffffff',

    fontSize: 18,
    fontWeight: '600',
  },


  statusImage: {
    width: 86,
    height: 40,

    resizeMode: 'contain',
  },


  topButtons: {
    marginTop: 16,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 2,
  },


  smallRoundButton: {
    width: 53,
    height: 53,

    borderRadius: 27,

    backgroundColor: '#1c1c1e',

    borderWidth: 1,
    borderColor: '#343436',

    alignItems: 'center',
    justifyContent: 'center',
  },


  display: {
    height: 275,

    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    paddingHorizontal: 5,
  },


  example: {
    color: '#77777c',

    fontSize: 28,

    marginBottom: 6,
  },


  answer: {
    width: '100%',

    color: '#ffffff',

    fontSize: 77,
    fontWeight: '400',

    lineHeight: 86,

    textAlign: 'right',
  },


  plusMinusImage: {
    width: 50,
    height: 50,
  },


  keyboard: {
    width: 407,

    alignSelf: 'center',

    marginTop: 'auto',
  },


  row: {
    width: 407,

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 11,
  },


  button: {
    width: 92,
    height: 92,

    borderRadius: 46,

    alignItems: 'center',
    justifyContent: 'center',
  },


  darkButton: {
    backgroundColor: '#333333',
  },


  lightButton: {
    backgroundColor: '#5A5A5A',
  },


  orangeButton: {
    backgroundColor: '#FF9500',
  },


  pressedButton: {
    opacity: 0.6,
  },


  buttonText: {
    color: '#ffffff',

    fontSize: 41,
    fontWeight: '400',

    textAlign: 'center',

    includeFontPadding: false,
  },


  lightButtonText: {
    color: '#ffffff',
  },

});