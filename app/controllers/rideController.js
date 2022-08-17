const Ride = require("../models/ride");

const rideController = {
  home: async (req, res) => {
    res.status(200).json("hello World");
  },
  findAllRides: async (req, res) => {
    try {
      // we look for all rides
      const rides = await Ride.find({});
      if (!rides) {
        res.status(404).json({
          message: "No rides found",
        });
      } else {
        res.status(200).json(rides);
      }
    } catch (err) {
      res.status(404).json(err.message);
    }
  },

  findOne: async (req, res) => {
    const {
      rideId
    } = req.params;
    try {
      // we look for one ride based on its id
      const oneRide = await Ride.findOne({
        _id: rideId
      });
      if (!oneRide) {
        res.status(404).json({
          message: "No ride found with this id",
        });
      } else {
        res.status(200).json(oneRide);
      }
    } catch (err) {
      res.status(404).json(err.message);
    }
  },

  findByVisitor: async (req, res) => {
    const {
      visitorId
    } = req.params;
    try {
      // we look for all rides visited by this visitor
      const rides = await Ride.find({
        visitor: visitorId,
      }, {
        // we decide to display the event name only (no id, no visitor, no timestamp)
        event: 1,
        _id: 0
      });
      if (!rides) {
        res.status(404).json({
          message: "No rides found with this visitor id",
        });
      } else {
        res.status(200).json(rides);
      }
    } catch (err) {
      res.status(404).json(err.message);
    }
  },

  // POST /rides
  addNewRide: async (req, res) => {
    try {
      const {
        event,
        visitorId
      } = req.body;
      // we create a new record based on body data
      const newRide = await Ride.create({
        event: event,
        visitor: visitorId
      });

      res.status(200).json(newRide);

    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  editRide: async (req, res) => {
    try {
      const {
        rideId
      } = req.params;
      // we make sure the ride exists in database
      const ride = await Ride.findById({
        _id: rideId
      });

      // If it exists, we get the body data and update the document accordingly
      if (ride) {
        const {
          eventName,
          visitorId
        } = req.body;

        if (eventName) {
          ride.event = eventName;
          console.log('coucou', ride.event);
        }
        if (visitorId) {
          ride.visitor = visitorId;
        }
        const updatedRide = await ride.save();
        res.status(200).json(updatedRide);
      } else {
        res.status(404).json({
          message: 'Ride not found'
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json(err.message);
    }
  },
  deleteRide: async (req, res) => {
    try {
      const {
        rideId
      } = req.params;
      // we make sure the ride exists in database
      const ride = await Ride.findById({
        _id: rideId
      });

      // If it exists, we get the body data and update the document accordingly
      if (ride) {
        ride.deleteOne()
        res.status(200).json({
          message: 'Ride successfully deleted'
        });
      } else {
        res.status(404).json({
          message: 'Ride not found'
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json(err.message);
    }
  }
};

module.exports = rideController;