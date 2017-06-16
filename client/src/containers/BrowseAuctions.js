import React, { Component } from 'react';
import { connect } from 'react-redux';

/* * Utils * */
import _ from 'lodash';
import { Link } from 'react-router-dom';

/* * Actions * */
import { fetchAuctions } from '../actions';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';


class BrowseAuctions extends Component {

  componentDidMount() {
    this.props.fetchAuctions(this.props.showing);
  }

  renderAuctions() {
    const styles = {
      image: {
        height: '300px',
        objectFit: 'cover'
      },
      grow: {
        padding: '4px',
        width: '30rem'
      }
    }
    return _.map(this.props.auctions, auction => {
      return (
        <div key={auction.id} style={styles.grow}>
          <Link to={`/auction/${auction.id}`}>
            <MuiThemeProvider>
              <Card key={auction.id}>
                <CardMedia
                  overlay={<CardTitle
                    title={auction.title}
                    titleStyle={{fontSize: 20}}
                  />}
                  overlayContentStyle={{ paddingBottom: 8 }}
                >
                  <img src={auction.images[0].url} style={styles.image} />
                </CardMedia>
              </Card>
            </MuiThemeProvider>
          </Link>
        </div>
      )
    });
  }

  render() {
    const styles = {
      grid: {
          margin: '8px',
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }
      }

    return (
      <div style={styles.grid}>
        {this.renderAuctions()}
      </div>
    )
  }
}

function mapStateToProps({ auctions, categories }) {
  return {
    auctions: auctions,
    showing: categories.showing
  };
}

export { BrowseAuctions };
export default connect(mapStateToProps, { fetchAuctions })(BrowseAuctions);




