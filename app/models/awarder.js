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
	LETS_GET_STARTED: {
		id: 1,
		name: "Let's get started!",
		desc: "Join the Yunify Community.",
		worth: 5,
		isCompleted: function(user) {
			return (stats.getLoginCount(user) >= 1);
		}
	},
	SOCIAL_MEDIA_JUNKIE: {
		id: 2,
		name: "Social Media Junkie!",
		desc: "Fill in your twitter account.",
		worth: 5
	},
	EARN_50_POINTS: {
		id: 3,
		name: "Points Collector",
		desc: "Earn 50 points",
		worth: 5,
		isCompleted: function(user) {
			return (stats.getScoreCount(user) >= 50);
		}
	},
	EARN_5_AWARDS: {
		id: 4,
		name: "5 Awards",
		desc: "Earn 5 Awards",
		worth: 5,
		isCompleted: function() {
			return (stats.getAwardCount() >= 5);
		}
	},
	COMPLETE_5_TASKS: {
		id: 5,
		name: "5 Tasks",
		desc: "Complete 5 Tasks",
		worth: 5,
		isCompleted: function() {
			return (stats.getTaskCount() >= 5);
		}
	},
	MAJOR: {
		id: 6,
		name: "Major",
		desc: "Become a major",
		worth: 5
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
		if(unlocked_achievement.id === achievement.id) {
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
	var achievement = null;
	if(achievement_name in this.achievements) {
		achievement = this.achievements[achievement_name];
		if(achievement.isCompleted(user) && this.unlockAchievement(achievement, user)) {
			cb(achievement);
		} else {
			cb('false');
		}
	}
};
