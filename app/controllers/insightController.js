const Ride = require("../models/ride");

const insightController = {
  groupByVisitor: async (req, res) => {
    try {
      // we use the aggregate method
      // it accepts an argument, an array of aggregate "functions"
      // which are actually objects following a specific format
      // the $ symbol used on the value side refers to the current document
      const aggregate = await Ride.aggregate([
        {
          $project: {
            event: 1,
            visitor: 1,
            timestamp: 1,
          },
        },
        // Adding a limit for testing purposes only as the data set is big
        {
          $limit: 15,
        },
        {
          // In the results, each line will have one visitor id
          // and an array events conatining the event name and the timestamp
          $group: {
            _id: "$visitor",
            events: {
              $push: {
                event: "$event",
                timestamp: "$timestamp",
              },
            },
          },
        },
      ]);

      res.status(200).json(aggregate);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  groupByEvent: async (req, res) => {
    try {
      const aggregate = await Ride.aggregate([
        {
          $project: {
            event: 1,
            visitor: 1,
            timestamp: 1,
          },
        },
        // Good practice: if I have a doubt on the homogeneity of the collection,
        // the match function can ensure the results' consistency
        // this will return only the documents which have an event field
        {
          $match: {
            event: {
              $exists: true,
            },
          },
        },
        {
          // In the results, each line will show an event name
          // and the number of visits of that event
          $group: {
            _id: "$event",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      res.status(200).json(aggregate);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  getPopularEvents: async (req, res) => {
    try {
      const aggregate = await Ride.aggregate([
        {
          $project: {
            event: 1,
            visitor: 1,
            timestamp: 1,
          },
        },
        {
          // for consistency, we only take into account the documents where the event and visitor fields exist
          // for performance purposes, it is better to have the match function among the first functions in the pipeline
          $match: {
            event: {
              $exists: true,
            },
            visitor: {
              $exists: true,
            },
          },
        },
        {
          // In the results, each line will show an event name
          // and the number of visits of that event
          $group: {
            _id: "$event",
            count: {
              $sum: 1,
            },
          },
        },
        {
          // Here we only display events whose visit number is higher than 50,700
          $match: {
            count: {
              $gt: 50700,
            },
          },
        },
        // we sort the lines by descending order (based on visit number)
        {
          $sort: {
            count: -1,
          },
        },
      ]);

      res.status(200).json(aggregate);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  getVisitsPerYearAndMonth: async (req, res) => {
    try {
      const aggregate = await Ride.aggregate([
        {
          $project: {
            event: 1,
            visitor: 1,
            timestamp: 1,
          },
        },
        {
          // for consistency, we only take into account the documents where the event and visitor fields exist
          // for performance purposes, it is better to have the match function among the first functions in the pipeline
          $match: {
            event: {
              $exists: true,
            },
            visitor: {
              $exists: true,
            },
          },
        },
        {
          // In the results, each line will show an event name
          // and the number of visits of that event
          $group: {
            _id: "$event",
            count: {
              $sum: 1,
            },
          },
        },
        {
          // Here we only display events whose visit number is higher than 50,700
          $match: {
            count: {
              $gt: 50700,
            },
          },
        },
        // we sort the lines by descending order (based on visit number)
        {
          $sort: {
            count: -1,
          },
        },
      ]);

      res.status(200).json(aggregate);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  getVisitsPerYearAndMonth: async (req, res) => {
    try {
      const { year, month } = req.params;
      const aggregate = await Ride.aggregate([
        {
          $project: {
            event: "$event",
            timestamp: {
              $dateFromString: {
                dateString: "$timestamp",
              },
            },
          },
        },
        {
          // $month returns the month of a date (timestamp field) between 1 and 12
          // $year returns the year portion of a date
          $project: {
            month: { $month: "$timestamp" },
            year: { $year: "$timestamp" },
          },
        },
        {
          // we filter by the month and year passed in params
          $match: {
            month: parseInt(month, 10),
            year: parseInt(year, 10),
          },
        },
        {
          // The $group stage separates documents into groups according to a "group key"
          // The output is one document for each unique group key
          $group: {
            _id: "$month", // group key
            count: {
              $sum: 1,
            },
          },
        },
        // we display the year and month as a string in results for clarity
        {
          $set: {
            year: year,
            month: {
              $arrayElemAt: [
                [
                  "",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                parseInt(month, 10),
              ],
            },
          },
        },
        {
          // we remove the id (group key) from the results
          $project: {
            _id: 0,
          },
        },
      ]);

      res.status(200).json(aggregate);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
};

module.exports = insightController;
