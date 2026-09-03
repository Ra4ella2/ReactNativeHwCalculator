import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

type CalculatorButtonProps = {
  text?: string;
  color?: 'dark' | 'light' | 'orange';
  icon?: boolean;
};

function CalculatorButton({
  text,
  color = 'dark',
  icon = false,
}: CalculatorButtonProps) {
  return (
    <View
      style={[
        styles.button,

        color === 'dark' && styles.darkButton,
        color === 'light' && styles.lightButton,
        color === 'orange' && styles.orangeButton,
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
    </View>
  );
}

export default function Index() {
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

          <Text style={styles.example}>
            38 670÷50 000
          </Text>

          <Text style={styles.answer}>
            0,7734
          </Text>

        </View>

        <View style={styles.keyboard}>

          <View style={styles.row}>

            <CalculatorButton
              color="light"
              icon={true}
            />

            <CalculatorButton
              text="AC"
              color="light"
            />

            <CalculatorButton
              text="%"
              color="light"
            />

            <CalculatorButton
              text="÷"
              color="orange"
            />

          </View>

          <View style={styles.row}>

            <CalculatorButton text="7" />

            <CalculatorButton text="8" />

            <CalculatorButton text="9" />

            <CalculatorButton
              text="×"
              color="orange"
            />

          </View>

          <View style={styles.row}>

            <CalculatorButton text="4" />

            <CalculatorButton text="5" />

            <CalculatorButton text="6" />

            <CalculatorButton
              text="−"
              color="orange"
            />

          </View>

          <View style={styles.row}>

            <CalculatorButton text="1" />

            <CalculatorButton text="2" />

            <CalculatorButton text="3" />

            <CalculatorButton
              text="+"
              color="orange"
            />

          </View>

          <View style={styles.row}>

            <View style={[styles.button, styles.darkButton]}>
              <Image
                source={require('../../assets/images/icon2.png')}
                style={styles.plusMinusImage}
                resizeMode="contain"
              />
            </View>

            <CalculatorButton text="0" />

            <CalculatorButton text="," />

            <CalculatorButton
              text="="
              color="orange"
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

  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 5,
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
    color: '#ffffff',

    fontSize: 77,
    fontWeight: '400',

    lineHeight: 86,
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