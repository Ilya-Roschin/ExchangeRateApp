import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

const ExchangeRateScreen = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    axios
      .get('https://belarusbank.by/api/kursExchange?city=Минск')
      .then(response => setExchangeRate(response.data[0]))
      .catch(error => console.log(error));
  }, []);

  const handleAmountChange = (value) => {
    setAmount(value);
    rate = exchangeRate[selectedCurrency + '_out'];
    if (selectedCurrency == 'RUB') {
      rate = rate / 100;
    }
    const convertedValue = parseFloat(value) * rate;
    setConvertedAmount(convertedValue.toFixed(2));
  }

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
  }

  return (
    <View style={styles.container}>
      {exchangeRate ? (
        <>
          <Text style={styles.text}>
            Exchange rates for {exchangeRate.date}:
          </Text>
          <Text style={styles.text}>
            USD/BYN: {exchangeRate.USD_in} / {exchangeRate.USD_out}
          </Text>
          <Text style={styles.text}>
            EUR/BYN: {exchangeRate.EUR_in} / {exchangeRate.EUR_out}
          </Text>
          <Text style={styles.text}>
            RUB/BYN: {exchangeRate.RUB_in} / {exchangeRate.RUB_out}
          </Text>
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={handleCurrencyChange}
            style={styles.picker}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="RUB" value="RUB" />
          </Picker>
          <Text style={styles.text}>Enter amount:</Text>
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
  picker: {
    width: '80%',
  },
});

export default ExchangeRateScreen;
