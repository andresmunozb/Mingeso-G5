import {typography} from 'material-ui/styles';
import {grey600} from 'material-ui/styles/colors';

const styles = {
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block',
    position:'relative',
    right:'15%'
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  },
  paper: {
    width: 600,
    padding: 30,
    position:'relative',
    left:'28%'
  },
  paper2:{
    padding: 30

  },

  paper3: {
    width: 1000,
    padding: 30,
    position:'relative',
    left:'10%'

  },
  clear: {
    clear: 'both'
  },
  forms:{
    width: 500
  },
  forms2:{
    width: 900
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  }
};


export default styles;
