import datetimepicker from '../component/datePicker'

const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  
const showDatepicker = () => {
    showMode('date');
  };
  
const showTimepicker = () => {
    
    showMode('time');
  };

const ButtonDatePicker = ({ text, onPress ,orientation,size}) => {
    return (
      <TouchableOpacity onPress={showDatepicker} >
        <View>
            <datetimepicker></datetimepicker>
        </View>
      </TouchableOpacity>
    )
  }
  
  export default ButtonDatePicker;
  
  <Button onPress={showDatepicker} title="Show " />
  {show && (
  <DateTimePicker
  testID="dateTimePicker"
  value={date}
  mode={mode}
  is24Hour={true}
  display="default"
  onChange={onChange}
  />
  )}