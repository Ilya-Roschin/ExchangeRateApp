import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';

const ExchangeRateScreen = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    axios
      .get('https://belarusbank.by/api/kursExchange?city=Минск')
      .then(response => setExchangeRate(response.data[0]))
      .catch(error => console.log(error));
  }, []);

  const handleAmountChange = (value) => {
    setAmount(value);
    const convertedValue = parseFloat(value) * exchangeRate.USD_out;
    setConvertedAmount(convertedValue.toFixed(2));
  }

  return (
    <View style={styles.container}>
      {exchangeRate ? (
        <>
          <Text style={styles.text}>
            USD/BYN: {exchangeRate.USD_in} / {exchangeRate.USD_out}
          </Text>
          <Text style={styles.text}>s
            EUR/BYN: {exchangeRate.EUR_in} / {exchangeRate.EUR_out}
          </Text>
          <SvgUri
            style={styles.svg}
            uri={`https://belarusbank.by${exchangeRate.flag}`}
            width="50"
            height="50"
          />
          <Text style={styles.text}>Enter amount in USD:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            keyboardType="numeric"
            onChangeText={handleAmountChange}
          />
          {convertedAmount !== '' && (
            <Text style={styles.text}>
              Converted amount in BYN: {convertedAmount}
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  svg: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ExchangeRateScreen;