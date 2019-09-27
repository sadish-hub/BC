import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewVechicle extends Component {
    render() {
        const { vechicleView } = this.props;
        return (
            <div className="row">
                <div className="col-sm-12"><h2>View Vechicle</h2></div>
                <div className="col-sm-6 viewcustomer">
                    <div>
                        <span>Make:</span>
                        <span>{vechicleView.make}</span>
                    </div>
                    <div>
                        <span>Model:</span>
                        <span>{vechicleView.model}</span>
                    </div>
                    <div>
                        <span>Variant:</span>
                        <span>{vechicleView.variant}</span>
                    </div>
                    <div>
                        <span>Year:</span>
                        <span>{vechicleView.year}</span>
                    </div>
                    <div>
                        <span>Year:</span>
                        <span>{vechicleView.vechicleNumber}</span>
                    </div>
                    <div>
                        <span>City:</span>
                        <span>{vechicleView.city}</span>
                    </div>
                </div>
                <div className="col-sm-6 viewcustomer">
                    <div>
                        <span>Price:</span>
                        <span>{vechicleView.price}</span>
                    </div>
                    <div>
                        <span>Offer:</span>
                        <span>{vechicleView.offer}</span>
                    </div>
                    <div>
                        <span>Ex ShowRoom Price:</span>
                        <span>{vechicleView.exShowRoomPrice}</span>
                    </div>
                    <div>
                        <span>on Road Price:</span>
                        <span>{vechicleView.onRoadPrice}</span>
                    </div>
                    <div>
                        <span>Current Price:</span>
                        <span>{vechicleView.currentPrice}</span>
                    </div>
                </div>
            </div>
        );
    }
}

ViewVechicle.propTypes = {
    vechicleView: PropTypes.shape({
        id: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        variant: PropTypes.string,
        year: PropTypes.number,
        vechicleNumber: PropTypes.string,
        price: PropTypes.number,
        offer: PropTypes.string,
        city: PropTypes.string,
        exShowRoomPrice: PropTypes.number,
        onRoadPrice: PropTypes.number,
        currentPrice: PropTypes.number
    })
};
export default ViewVechicle;