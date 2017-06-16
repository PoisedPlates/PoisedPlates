import React, { Component } from 'react';
import { connect } from 'react-redux';

/* * Utils * */
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';

/* * Actions * */
import { postAuction, selectImage, deselectImage } from '../actions';

/* * Styles * */
import { Card, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ImagePhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import MenuItem from 'material-ui/MenuItem';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import {
  AutoComplete,
  DatePicker,
  TimePicker,
  SelectField,
  TextField
} from 'redux-form-material-ui';

const states = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL',
  'GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
  'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
  'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

const categories = [
  ['antiques', 'Antiques'],
  ['appliances', 'Appliances'],
  ['arts+crafts', 'Arts & Crafts'],
  ['atv/utv/sno', 'ATVs, UTVs, & Snowmobiles'],
  ['auto parts', 'Auto Parts'],
  ['baby+kid', 'Baby & Kid'],
  ['beauty+hlth', 'Beauty & Health'],
  ['bikes', 'Bikes'],
  ['boats', 'Boats'],
  ['books', 'Books'],
  ['cars+trucks', 'Cars & Trucks'],
  ['cell phones', 'Cell Phones'],
  ['clothes', 'Clothes'],
  ['computers', 'Computers'],
  ['electronics', 'Electronics'],
  ['farm+garden', 'Farm & Garden'],
  ['furniture', 'Furniture'],
  ['general', 'Miscellaneous'],
  ['household', 'Household'],
  ['camping', 'Camping'],
  ['tools', 'Tools'],
  ['toys+games', 'Toys & Games']
];

const styles = {
  outer: {
    padding: '5rem'
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
    height: '100%'
  },
  align: {
    verticalAlign: 'bottom'
  },
  button: {
    margin: 8
  },
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  card: {
    width: '80%'
  },
  state: {
    width: 80
  }
}

// validation functions
const required = value => (value == null ? 'Required' : undefined);


class AuctionForm extends Component {

  handleImages(e) {
    let image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => this.props.selectImage(e.target.result, image);
    reader.readAsDataURL(e.target.files[0]);
  }

  formatData(response) {
    let fd = new FormData();
    fd.append('key', response.data.params.key);
    fd.append('file', this.props.file);
    fd.append('policy', response.data.params.policy);
    fd.append('x-amz-algorithm', response.data.params['x-amz-algorithm']);
    fd.append('x-amz-credential', response.data.params['x-amz-credential']);
    fd.append('x-amz-date', response.data.params['x-amz-date']);
    fd.append('x-amz-signature', response.data.params['x-amz-signature']);
    return fd;
  }

  onSubmit(values) {
    // Get AWS signature
    axios.get('/s3', { params: { name: this.props.file.name, type: this.props.file.type } })
      .then((response) => {
        // Format S3 data and add new image url to auction data
        const fd = this.formatData(response);
        let s3Url = `${response.data.endpoint_url}/${response.data.params.key.split(' ').join('+')}`;
        let auctionData = Object.assign({}, values, { url: s3Url });

        // Post file with signature
        axios.post(response.data.endpoint_url, fd)
          .then((awsResponse) => {
            console.log('Image(s) uploaded.');
          })
          .catch((err) => {
            alert('Error uploading image, please try again.');
          });

        this.props.deselectImage();
        // Post auction data to db
        this.props.postAuction(auctionData, () => {
          this.props.history.push('/');
        });
      });
  }

  CameraUpload(props) {
    return props.mobile ?
    <RaisedButton
      icon={<ImagePhotoCamera />}
      labelPosition="before"
      style={styles.button}
    >
      <input
        type="file"
        accept="image/*"
        capture="camera"
        style={styles.imageInput}
        onChange={props.handleImages}
      />
    </RaisedButton> :
    null;
  }

  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <div style={styles.outer} >
        <div style={styles.inner}>
          <Card style={styles.card}>
            <CardMedia>
              <img src={this.props.displayImage} />
            </CardMedia>
          </Card>
          <form>
            {/*-- Photo --*/}
            <RaisedButton
              label="Choose an Image"
              labelPosition="before"
              style={styles.button}
              containerElement="label"
            >
              <input
                type="file"
                accept="image/*"
                style={styles.imageInput}
                onChange={this.handleImages.bind(this)}
              />
            </RaisedButton>
            <this.CameraUpload
              mobile={this.props.mobile}
              handleImages={this.handleImages.bind(this)}
            />
            {/*-- Category --*/}
            <div>
              <Field
                name="category"
                component={SelectField}
                hintText="Category"
                floatingLabelText="Category"
                validate={required}
                fullWidth={true}
              >
                {categories.map((category, idx) => (
                  <MenuItem key={idx} value={category[0]} primaryText={category[1]} />
                ))}
              </Field>
            </div>
            {/*-- Title --*/}
            <div>
              <Field
                name="title"
                component={TextField}
                hintText="What is it?"
                floatingLabelText="Title"
                validate={required}
                fullWidth={true}
              />
            </div>
            {/*-- Description --*/}
            <div>
              <Field
                name="description"
                component={TextField}
                hintText="What's cool about it?"
                floatingLabelText="Description"
                multiLine
                rows={2}
                validate={required}
                fullWidth={true}
              />
            </div>
            {/*-- Location --*/}
            <div>
              <Field
                name="city"
                component={TextField}
                hintText="City"
                floatingLabelText="City"
                validate={required}
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                name="state"
                component={SelectField}
                hintText="State"
                floatingLabelText="State"
                validate={required}
                style={styles.state}
              >
                {states.map((state, idx) => (
                  <MenuItem key={idx} value={state} primaryText={state} />
                ))}
              </Field>
            </div>
            {/*-- End Time --*/}
            <div>
              <Field
                name="date"
                component={DatePicker}
                format={null}
                hintText="End Date"
                validate={required}
                style={styles.align}
                fullWidth={true}
              />
              {
                // <Field
                //           name="time"
                //           component={TimePicker}
                //           format={null}
                //           // Do we need this?  defaultValue={null} // TimePicker requires an object,
                //           // and redux-form defaults to ''
                //           hintText="End Time"
                //           validate={required}
                //           style={styles.align}
                //         />
                      }
            </div>
          </form>
          <div>
            <RaisedButton
              label="Submit"
              primary={true}
              onClick={handleSubmit(this.onSubmit.bind(this))}
              style={styles.button}
            />
            <Link to="/">
              <RaisedButton
                label="Cancel"
                secondary={true}
                onClick={reset}
                style={styles.button}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ images, device }) => {
  return {
    mobile: device.mobile,
    displayImage: images.displayImage,
    file: images.file
  };
};

export default reduxForm({
  form: 'PostNewAuction'
})(connect(mapStateToProps, { postAuction, selectImage, deselectImage })(AuctionForm));


