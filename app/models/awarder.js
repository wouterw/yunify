/*!
 * Awarder module
 */

var stats = require('./statistics'),
		_ = require('underscore')._,
		mongoose = require('mongoose'),
		User = mongoose.model('User');

var awarder = exports = module.exports = {};

/*
 * Object containing all achievements
 */
awarder.achievements = {
	SOCIAL_MEDIA_JUNKIE: {
		id: 1,
		name: "Social Media Junkie!",
		desc: "Fill in your twitter account.",
		worth: 5,
		isCompleted: function( user ) {
			return ( user.twitter && user.twitter.length > 0);
		}
	},
	EARN_50_POINTS: {
		id: 2,
		name: "Points Collector",
		desc: "Earn 50 points",
		worth: 5,
		isCompleted: function( user ) {
			return (stats.getScoreCount( user ) >= 50);
		}
	},
	COMPLETE_5_TASKS: {
		id: 3,
		name: "Worker",
		desc: "5 Tasks",
		worth: 5,
		isCompleted: function( user ) {
			return (stats.getTaskCount( user ) >= 5);
		}
	},
	COMPLETE_25_TASKS: {
		id: 4,
		name: "Taskalisious!",
		desc: "25 Tasks",
		worth: 5,
		isCompleted: function( user ) {
			return (stats.getTaskCount( user ) >= 25);
		}
	},
	COMPLETE_50_TASKS: {
		id: 5,
		name: "Taskmonster!",
		desc: "50 Tasks",
		worth: 5,
		isCompleted: function( user ) {
			return (stats.getTaskCount( user ) >= 50);
		}
	}
};

_.each(awarder.achievements, function(obj) {
	if(!obj.isCompleted) {
		obj.isCompleted = function() { return true; };
	}
	if(!obj.hidden) {
		obj.hidden = false;
	}
});


/*
 * Returns the achievement with the given id
 */
awarder.getAchievementById = function(id) {
	var found = null;
	_.each(this.achievements, function(achievement, key) {
		if(achievement.id === parseInt(id, 10)) {
			found = achievement;
		}
	});
	return found;
};

/*
 * Check if user has unlocked the achievement
 */
awarder.hasUnlockedAchievement = function(achievement, user) {
	var unlocked = false;
	_.each(user.achievements.unlocked, function(unlocked_achievement) {
		if(unlocked_achievement.id == achievement.id) {
			unlocked = true;
		}
	});
	return unlocked;
};

/*
 * Unlock a achievement
 */
awarder.unlockAchievement = function(achievement, user) {
	if(!this.hasUnlockedAchievement(achievement, user)) {
		return User.findById(user.id, function(err, found_user) {
			if (!err) {
				found_user.achievements.unlocked.push({
					id: achievement.id,
					name: achievement.name,
					desc: achievement.desc,
					worth: achievement.worth,
					awarded_at: new Date()
				});
				return found_user.save(function(err) {
					if (!err) {
						return true;
					} else {
						console.log(err);
						return false;
					}
				});
			} else {
				console.log(err);
				return false;
			}
		});
	}
	return false;
};

/*
 * Try to unlock a achievement
 */
awarder.tryUnlockingAchievement = function(achievement_name, user, cb) {
	var self = this;
	fixUser(user, function ( err, user ) {
		var achievement = null;
		if(achievement_name in self.achievements) {
			achievement = self.achievements[achievement_name];
			if(achievement.isCompleted(user) && self.unlockAchievement(achievement, user)) {
				cb(achievement);
			} else {
				cb('false');
			}
		}
	});
};

/*
 * Helpers
 */
var fixUser = function ( user, cb ) {
	if (typeof user === 'string' || typeof user === 'number') {
		User.findById(user, cb);
	} else {
		cb( null, user );
	}
};

