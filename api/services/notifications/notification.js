/**
 * Source definition for
 *
 * @module    :: Source
 * @description ::
 */
 var util = require("util");
 var events = require("events");
 var _ = require('underscore');
 var async = require('async');



module.exports = {

	passThrough: function(fields, settings, cb){
		cb(null, {});
	},
	prepareProjectCommentReplyParentEmail: function(fields, settings, cb){
		var content = {};
		content.fields = _.extend({}, sails.services.utils.emailTemplate['generateEmailLocals']('projectCommentParentReply'));
		content.settings = {};
		UserEmail.find({ userId : fields.recipientId }).done(function(err, userEmails){
			if(err){ console.log(err); cb(null, content); return false;}
			var userEmail = userEmails.pop();
			if(userEmail) {content.fields.to = userEmail.email;}
			else {content.fields.to = null;}
			Comment.find({ id: fields.callerId }).done(function(err, comments){
				if(err){ console.log(err); cb(null, content); return false;}
				var callComment = comments.pop();
				if(callComment){
					Comment.find({ id: callComment.parentId }).done(function(err, comments){
						if(err){ console.log(err); cb(null, content); return false;}
						var parComment = comments.pop();
						if(parComment){
							User.find({id: callComment.userId}).done(function(err, users){
								if(err){ console.log(err); cb(null, content); return false;}
								var user = users.pop();
								if(user){
									Project.find({id: parComment.projectId}).done(function(err, projects){
										if(err){ console.log(err); cb(null, content); return false;}
										var project = projects.pop();
										if(project){
											content.fields.layout = 'default';
											content.fields.template = 'projectCommentParentReply';
											content.fields.from = sails.config['systemEmail'];
											content.fields.subject = user.name + " replied to you! Click the link below to see the entire discussion";
											content.fields.templateLocals = content.fields.templateLocals || {};
											content.fields.templateLocals.parentComment = parComment.value;
											content.fields.templateLocals.callerComment = callComment.value;
											content.fields.templateLocals.projectTitle = project.title;
											content.fields.templateLocals.projectLink = sails.config['hostName'] + ':' + sails.config['port'] + 'projects/' + project.id;
										}
										cb(err, content);
									});
								}
								else{
									cb(err, content);
								}
							});
						}
						else{
							cb(err, content);
						}
					});
				}
				else{
					cb(err, content);
				}
			});
		});
	},
	prepareProjectCommentReplyOwnerEmail: function(fields, settings, cb){
		var content = {};
		content.fields = _.extend({}, sails.services.utils.emailTemplate['generateEmailLocals']('projectCommentOwnerReply'));
		content.settings = {};
		UserEmail.find({ userId : fields.recipientId }).done(function(err, userEmails){
			if(err){ console.log(err); cb(null, content); return false;}
			var userEmail = userEmails.pop();
			if(userEmail) {content.fields.to = userEmail.email;}
			else {content.fields.to = null;}
			Comment.find({ id: fields.callerId }).done(function(err, comments){
				if(err){ console.log(err); cb(null, content); return false;}
				var callComment = comments.pop();
				if(callComment){
					Comment.find({ id: callComment.parentId }).done(function(err, comments){
						if(err){ console.log(err); cb(null, content); return false;}
						var parComment = comments.pop();
						if(parComment){
							User.find({id: callComment.userId}).done(function(err, users){
								if(err){ console.log(err); cb(null, content); return false;}
								var user = users.pop();
								if(user){
									Project.find({id: parComment.projectId}).done(function(err, projects){
										if(err){ console.log(err); cb(null, content); return false;}
										var project = projects.pop();
										if(project){
											content.fields.layout = 'default';
											content.fields.template = 'projectCommentOwnerReply';
											content.fields.from = sails.config['systemEmail'];
											content.fields.subject = "Your Project \"" + project.title + "\" Has a New Reply To \"" + parComment.value + "\"";
											content.fields.templateLocals = content.fields.templateLocals || {};
											content.fields.templateLocals.parentComment = parComment.value;
											content.fields.templateLocals.callerComment = callComment.value;
											content.fields.templateLocals.projectTitle = project.title;
											content.fields.templateLocals.projectLink = sails.config['hostName'] + ':' + sails.config['port'] + 'projects/' + project.id;
										}
										cb(err, content);
									});
								}
								else{
									cb(err, content);
								}
							});
						}
						else{
							cb(err, content);
						}
					});
				}
				else{
					cb(err, content);
				}
			});
		});
	},



	prepareTaskCommentReplyParentEmail: function(fields, settings, cb){
		var content = {};
		content.fields = _.extend({}, sails.services.utils.emailTemplate['generateEmailLocals']('taskCommentParentReply'));
		content.settings = {};
		UserEmail.find({ userId : fields.recipientId }).done(function(err, userEmails){
			if(err){ console.log(err); cb(null, content); return false;}
			var userEmail = userEmails.pop();
			if(userEmail) {content.fields.to = userEmail.email;}
			else {content.fields.to = null;}
			Comment.find({ id: fields.callerId }).done(function(err, comments){
				if(err){ console.log(err); cb(null, content); return false;}
				var callComment = comments.pop();
				if(callComment){
					Comment.find({ id: callComment.parentId }).done(function(err, comments){
						if(err){ console.log(err); cb(null, content); return false;}
						var parComment = comments.pop();
						if(parComment){
							User.find({id: callComment.userId}).done(function(err, users){
								if(err){ console.log(err); cb(null, content); return false;}
								var user = users.pop();
								if(user){
									Task.find({id: parComment.taskId}).done(function(err, tasks){
										if(err){ console.log(err); cb(null, content); return false;}
										var task = tasks.pop();
										if(task){
											content.fields.layout = 'default';
											content.fields.template = 'taskCommentParentReply';
											content.fields.from = sails.config['systemEmail'];
											content.fields.subject = user.name + " replied to you! Click the link below to see the entire discussion";
											content.fields.templateLocals = content.fields.templateLocals || {};
											content.fields.templateLocals.parentComment = parComment.value;
											content.fields.templateLocals.callerComment = callComment.value;
											content.fields.templateLocals.taskTitle = task.title;
											content.fields.templateLocals.taskLink = sails.config['hostName'] + ':' + sails.config['port'] + 'tasks/' + task.id;
										}
										cb(err, content);
									});
								}
								else{
									cb(err, content);
								}
							});
						}
						else{
							cb(err, content);
						}
					});
				}
				else{
					cb(err, content);
				}
			});
		});
	},
	prepareTaskCommentReplyOwnerEmail: function(fields, settings, cb){
		var content = {};
		content.fields = _.extend({}, sails.services.utils.emailTemplate['generateEmailLocals']('taskCommentOwnerReply'));
		content.settings = {};
		UserEmail.find({ userId : fields.recipientId }).done(function(err, userEmails){
			if(err){ console.log(err); cb(null, content); return false;}
			var userEmail = userEmails.pop();
			if(userEmail) {content.fields.to = userEmail.email;}
			else {content.fields.to = null;}
			Comment.find({ id: fields.callerId }).done(function(err, comments){
				if(err){ console.log(err); cb(null, content); return false;}
				var callComment = comments.pop();
				if(callComment){
					Comment.find({ id: callComment.parentId }).done(function(err, comments){
						if(err){ console.log(err); cb(null, content); return false;}
						var parComment = comments.pop();
						if(parComment){
							User.find({id: callComment.userId}).done(function(err, users){
								if(err){ console.log(err); cb(null, content); return false;}
								var user = users.pop();
								if(user){
									Task.find({id: parComment.taskId}).done(function(err, tasks){
										if(err){ console.log(err); cb(null, content); return false;}
										var task = tasks.pop();
										if(task){
											content.fields.layout = 'default';
											content.fields.template = 'taskCommentOwnerReply';
											content.fields.from = sails.config['systemEmail'];
											content.fields.subject = "Your Task \"" + task.title + "\" Has a New Reply To \"" + parComment.value + "\"";
											content.fields.templateLocals = content.fields.templateLocals || {};
											content.fields.templateLocals.parentComment = parComment.value;
											content.fields.templateLocals.callerComment = callComment.value;
											content.fields.templateLocals.taskTitle = task.title;
											content.fields.templateLocals.taskLink = sails.config['hostName'] + ':' + sails.config['port'] + 'tasks/' + task.id;
										}
										cb(err, content);
									});
								}
								else{
									cb(err, content);
								}
							});
						}
						else{
							cb(err, content);
						}
					});
				}
				else{
					cb(err, content);
				}
			});
		});
	},
	prepareTaskVolunteerOwnerEmail : function(fields, settings, cb){
		// taskTitle: '', taskLink: '', profileLink: '', profileTitle: '', profileName: '', profileLocation: '', profileAgency: ''
		var content = {};
		content.fields = _.extend({}, sails.services.utils.emailTemplate['generateEmailLocals']('taskVolunteerAddedOwnerReply'));
		content.settings = {};
		UserEmail.find({ userId : fields.recipientId }).done(function(err, userEmails){
			if(err){ console.log(err); cb(null, content); return false;}
			var userEmail = userEmails.pop();
			if(userEmail) {content.fields.to = userEmail.email;}
			else {content.fields.to = null;}
			Task.find({ id: fields.callerId }).done(function(err, tasks){
				if(err){ console.log(err); cb(null, content); return false;}
				var task = tasks.pop();
				if(task){
					sails.services.utils.user['getUser'](fields.volunteerId, fields.volunteerId, function(err, volunteer){
						if(err){ console.log(err); cb(null, content); return false;}
						if(volunteer){
							content.fields.layout = 'default';
							content.fields.template = 'taskVolunteerAddedOwnerReply';
							content.fields.from = sails.config['systemEmail'];
							content.fields.subject = "Your Task \"" + task.title + "\" Has a New Volunteer: " + volunteer.name ;
							content.fields.templateLocals = content.fields.templateLocals || {};

							content.fields.templateLocals.taskTitle = task.title;
							content.fields.templateLocals.taskLink = sails.config['hostName'] + ':' + sails.config['port'] + 'tasks/' + task.id;
							content.fields.templateLocals.profileLink = sails.config['hostName'] + ':' + sails.config['port'] + 'profile/' + volunteer.id;
							content.fields.templateLocals.profileTitle = volunteer.title;
							content.fields.templateLocals.profileName = volunteer.name;
							volunteer.location = volunteer.location || {};
							volunteer.location.tag = volunteer.location.tag || {};
							volunteer.location.tag.name = volunteer.location.tag.name || '';
							volunteer.agency = volunteer.agency || {};
							volunteer.agency.tag = volunteer.agency.tag || {};
							volunteer.agency.tag.name = volunteer.agency.tag.name || '';
							content.fields.templateLocals.profileLocation = volunteer.location.tag.name;
							content.fields.templateLocals.profileAgency = volunteer.agency.tag.name;
						}
						cb(err, content);
					});
				}
				else{
					cb(err, content);
				}
			});
		});
	}
}