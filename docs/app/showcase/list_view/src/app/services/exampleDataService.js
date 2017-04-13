(function() {

  angular.module("app").service("exampleDataService", exampleDataService);

  exampleDataService.$inject = ['$state', '$rootScope'];

  function exampleDataService($state, $rootScope) {

    var count = 250;

    //names
    var names = [];
    for(var i = 0; i < 20; i++){
      names.push(chance.name());
    }
    names.sort();

    //creates documents/attachments and given them an icon and color
    var documents = [
      { type: "HTML document", extension: ".html", icon: "html-icon", iconColor: "#000000" },
      { type: "PDF document", extension: ".pdf", icon: "pdf-icon", iconColor: "#C01E07" },
      { type: "Word document", extension: ".doc", icon: "word-icon", iconColor: "#2B5797" },
      { type: "Excel spreadsheet", extension: ".xls", icon: "excel-icon", iconColor: "#207347" },
      { type: "Powerpoint", extension: ".ppt", icon: "powerpoint-icon", iconColor: "#D04727" }
    ];

    var extensions = [".html", ".pdf", ".doc", ".xls", ".ppt"];


    var storage = ["5.25", "15.25", "25.25", "75.25", "95.25"];

    //creates a list of discussion subjects
    var emails = [
      "The Periwinkle Foundation",
      "Jackson National Life",
      "Pooling Technial Subcomittee Meeeting",
      "New Starts documents",
      "Meeting Minutes",
      "Standard of Business Conduct",
      "Compliance with FCAP",
      "Monthly Newsletters",
      "All Employee Meeting",
      "Davis Taylor decision",
      "Requested updates",
      "Issues with blogging",
      "World Mental Health Week",
      "Announcement: HPE SW",
      "Attention all developers",
      "Maintenance down time",
      "Diversity in the work place",
      "UK works council changes",
      "The Randal Project",
      "Request for LOA",
      "Potential new client",
      "Career opportunities",
      "Deadline: need this today!",
      "Password needing reset",
      "Home login setup",
      "Your password is about to expire!",
      "Policy changes",
      "Make the most out of your career",
      "Purchase Order #23301",
      "Directors meeting",
      "New positions opened up",
      "Do you even javascript?",
      "Charity Event",
      "Fund raiser",
      "QA of outstanding tickets",
      "Useful links",
      "Monthly payslip",
      "UX updates",
      "Weekly catchup",
      "Daily standup meeting",
      "Why you should be using SCRUM",
      "UX Aspects latest features",
      "New positions opened up",
      "The Gavin Chronicles",
      "Charity football event",
      "Fundraiser for charities",
      "401k pension scheme",
      "Investors daily newspaper",
      "Application for sw dev role",
      "Review process updates",
      "Useful web links",
      "Staff dinner night!", 
      "Confirmation of order",
      "Invoices pending approval",
      "Planning of sprint #121",
      "Review documents",
      "Planning of sprint #121",
      "Suggested meeting times",
      "Issues with pushing",
      "Code review",
      "Web dev courses"
    ];

    // create a list of emails that will act as attachments
    var emailsAttached = [
      "Periwinkle questions",
      "Meeting questions",
      "SBC log",
      "Decision notes"
    ];

    //dates
    var today = new Date();
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    var aweekago = new Date();
    aweekago.setDate(aweekago.getDate() - 8);
    var oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 28);
    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    var dates = [today, oneWeekAgo, oneMonthAgo, oneYearAgo, aweekago];

    var d1 = {
      title: "Site Detail - UX Aspects (HTML)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var d2 = {
      title: "Site Detail - UX Aspects (PDF)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: 'affix-container',
      animate: true
    };

    var d3 = {
      title: "Site Detail - UX Aspects (DOC)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var d4 = {
      title: "Site Detail - UX Aspects (XLS)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var d5 = {
      title: "Site Detail - UX Aspects (PPT)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var newState = $state.current.name;
    var displayPanel = [d1, d2, d3, d4, d5];
    var data = getData(count);

    //watch for page to change and generates new data
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      newState = toState.name;
      data = getData(count);
    });

    return {
      getPage: getPage,
      getTotal: getTotal,
      getTotalWithFilters: getTotalWithFilters,
      todayValue: today,
      users: names,
      extensions: extensions,
      panel: displayPanel,
      storage: storage
    };

    //function to sort the array on specified key value. If two values are found equal, they are sorted on id.
    function sortByKey(array, key, descending) {
      if (descending === true) {
        return array.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return ((x < y) ? 1 : ((x > y) ? -1 : ((a.id < b.id) ? -1 : 1)));
        });
      }
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : ((a.id < b.id) ? -1 : 1)));
      });
    }

    function multiSortByKey(array, key, descending) {

      return array.sort(function(a, b) {
        var desc0 = 0;
        var desc1 = 0;
        var desc2 = 0;
        if (descending[0] === true) {
          desc0 = 1;
        }
        if (descending[1] === true) {
          desc1 = 2;
        }
        if (descending[2] === true) {
          desc2 = 4;
        }
        var sortCase = desc0 + desc1 + desc2;
        var x0 = a[key[0]];
        var y0 = b[key[0]];
        var x1 = a[key[1]];
        var y1 = b[key[1]];
        var x2 = a[key[2]];
        var y2 = b[key[2]];
        switch (sortCase) {
          case 0:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 1:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 2:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 3:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 4:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
          case 5:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
          case 6:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
          case 7:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
        }
      });
    }

    function getData(count) {
      var result = [];
      var obj = {};

      //leave space in results for the emails that will act as attachments (showing 2 levels)
      if (newState === "listview.listview2") count -= emailsAttached.length;

      for (var i = 0; i < count; i++) {
        obj = { id: i };

        //pick name
        var name = Math.floor(Math.random() * 20);
        obj.name = names[name];

        //pick date
        var date = i % dates.length;
        if (i % 2 === 0 && i % 3 === 0) {
          date = 0;
        }
        obj.date = dates[date];
        obj.rawDateString = $.datepicker.formatDate('d M yy', obj.date);
        obj.dateString = date === 0 ? "Today" : $.datepicker.formatDate('d M yy', obj.date);

        var rnd = Math.floor(Math.random() * 5);

        if (newState === "listview.listview2") {
          //based on random 'ext', decide wheter object should be a discussion or an attachment
          if (rnd < 4) {
            //get a random discussion
            var randomEmail = Math.floor(Math.random() * emails.length);

            // if we already have the discussion in our data list, the make it a response by appending 'RE'
            var found = false;
            for (var j = 0; j < result.length; j++) {
              if (result[j].document === emails[randomEmail]) {
                found = true;
                obj.discussionId = result[j].id;
                break;
              }
            }
            obj.document = found ? "RE: " + emails[randomEmail] : emails[randomEmail];

            obj.icon = "email-icon";
            obj.iconColor = "#ccbb00";
          }
          else {
            // make object an attachment
            var ext = Math.floor(Math.random() * 5);
            obj.document = documents[ext].type + documents[ext].extension;
            obj.extension = documents[ext].extension;
            obj.icon = documents[ext].icon;
            obj.iconColor = documents[ext].iconColor;
            obj.storage = storage[ext];
          }
        }
        //if list view 1, just create data as a list of documents
        else {
          obj.document = "Document " + (i + 1) + extensions[rnd];
          obj.extension = extensions[rnd];
          obj.panel = displayPanel[rnd];
          obj.storage = storage[rnd];
        }

        //active
        obj.active = (i % 5 === 0 && i % 3 === 0) || i % 2 === 0;

        result.push(obj);
      }

      if (newState === "listview.listview2") {
        //give attachments a random discussion as its parent
        var discussions = [];
        var attachments = result.filter(function(item) {
          if (item.extension)
            return item;
          else
            discussions.push(item);
        });
        for (var k = 0; k < attachments.length; k++) {
          attachments[k].parentId = discussions[Math.floor(Math.random() * discussions.length)].id;
        }

        var getPeriwinkle = function(item) { if (item.document === "The Periwinkle Foundation") nestedObj.parentId = item.id; };
        var getMeeting = function(item) { if (item.document === "Meeting Minutes") nestedObj.parentId = item.id; };
        var getSbc = function(item) { if (item.document === "Standard of Business Conduct") nestedObj.parentId = item.id; };
        var getDecision = function(item) { if (item.document === "Davis Taylor decision") nestedObj.parentId = item.id; };

        //giving 2 levels of grouping to show it (email with an attachment that is an email)
        for (var l = 0; l < emailsAttached.length; l++) {
          var nestedObj = {};
          nestedObj.id = result.length + l;
          nestedObj.name = names[Math.floor(Math.random() * 20)];
          nestedObj.date = dates[Math.floor(Math.random() * 4) + 1];
          nestedObj.dateString = $.datepicker.formatDate('d M yy', nestedObj.date);
          nestedObj.document = emailsAttached[l];
          nestedObj.icon = "email-icon";
          nestedObj.iconColor = "#ccbb00";

          if (nestedObj.document === "Periwinkle questions") {
            discussions.filter(getPeriwinkle);
            attachments[0].parentId = nestedObj.id;
            attachments[1].parentId = nestedObj.id;
          }
          else if (nestedObj.document === "Meeting questions") {
            discussions.filter(getMeeting);
            attachments[2].parentId = nestedObj.id;
            attachments[3].parentId = nestedObj.id;
          }
          else if (nestedObj.document === "SBC log") {
            discussions.filter(getSbc);
            attachments[4].parentId = nestedObj.id;
            attachments[5].parentId = nestedObj.id;
          }
          else if (nestedObj.document === "Decision notes") {
            discussions.filter(getDecision);
            attachments[6].parentId = nestedObj.id;
            attachments[7].parentId = nestedObj.id;
          }

          result.push(nestedObj);
        }

      }
      
      return result;

    }


    ///pageNumber is 0 indexed
    function getPage(pageNumber, pageSize, filters, sorter, orderDesc, groupType, multi, returnAll) {
      //smallest page is 0
      if (pageNumber < 0) {
        pageNumber = 0;
      }

      if (pageSize <= 0) {
        pageSize = 20;
      }

      //reset the values used for grouping styling
      for (var i = 0; i < data.length; i++) {
        data[i].showAttachment = false;
        data[i].showDiscussion = false;
        data[i].discussionFirst = false;
        data[i].discussionLast = false;
        data[i].level = null;
        if (data[i].parentId !== undefined)
          data[i].discussionId = null;
      }

      var arrayOfData = [];
      if (multi === true) {
        arrayOfData = multiSortByKey(data, sorter, orderDesc);
      } else {
        arrayOfData = sortByKey(data, sorter, orderDesc);
      }

      //depending on the grouping type selected, call the appropriate function
      if (groupType === "Group attachments") {
        arrayOfData = groupAttachments(arrayOfData);
      }
      else if (groupType === "Expand attachments") {
        arrayOfData = expandAttachments(arrayOfData);
      }
      else if (groupType === "Expand discussions") {
        arrayOfData = expandDiscussions(arrayOfData);
      }
      else if (groupType === "Expand all") {
        arrayOfData = expandAll(arrayOfData);
      }

      if (filters && filters.length) {
        arrayOfData = filters.reduce(function(arrayOfData, filterFunc) {
          return arrayOfData.filter(filterFunc);
        }, arrayOfData);
      }

      if (groupType === "Expand discussions" || groupType === "Expand all") {
        addDiscussionStyling(arrayOfData);
      }

      var start = pageNumber * pageSize;

      if (returnAll) 
        return arrayOfData;
      else
        return arrayOfData.slice(start, start + pageSize);
    }

    function groupAttachments(arrayOfData) {
      // filter attachments out into separate array
      var attachments = [];
      arrayOfData = arrayOfData.filter(function(data) {
        if (data.parentId === undefined)
          return data;
        else
          attachments.push(data); 
      });

      showAttachments(attachments, arrayOfData);

      return arrayOfData;
    }

    function expandAttachments(arrayOfData) {
      // filters discussions out into separate array
      var discussions = arrayOfData.filter(function(item) {
        return item.parentId === undefined;
      });

      var displayArray = [];

      //find the attachments of each discussion and nested attachments
      for (var idx = 0; idx < discussions.length; idx++) {
        var currentDiscussion = discussions[idx];
        displayArray.push(currentDiscussion);
        findAttachments(currentDiscussion, arrayOfData, displayArray);
      }

      return displayArray;
    }

    function expandDiscussions(arrayOfData) {
      return getDiscussions(arrayOfData);
    }

    function expandAll(arrayOfData) {
      var discussions = getDiscussions(arrayOfData);

      var displayArray = [];
      //find the attachments of each discussion 
      for (var idx = 0; idx < discussions.length; idx++) {
        var currentDiscussion = discussions[idx];
        displayArray.push(currentDiscussion);
        findAttachments(currentDiscussion, arrayOfData, displayArray);
      }

      return displayArray;
    }

    function findAttachments(discussion, arrayOfData, displayArray, level) {
      //set the current level
      if (level === undefined) {
        level = 1;
      }
 
      //filter attachments into separate array
      var attachments = arrayOfData.filter(function(data) { return discussion.id === data.parentId; });

      // if we have attachments iterate and call this recursively to find nested attachments
      if (attachments.length > 0) {
        discussion.showAttachment = true;
        for (var idx = 0; idx < attachments.length; idx++) {
          var attachment = attachments[idx];
          //push attachment directly below its parent
          displayArray.push(attachment);

          //give attachment its discussionId and its level for styling
          attachment.discussionId = discussion.discussionId ? discussion.discussionId : discussion.id;
          attachment.level = level;

          findAttachments(attachment, arrayOfData, displayArray, level + 1);
        }
      }
    }

    function getDiscussions(arrayOfData) {
      //filter root discussions into separate array
      var rootDiscussions = arrayOfData.filter(function(item) {
          return (item.parentId === undefined && item.discussionId === undefined);
      });

      var displayArray = [];

      var filterDiscussions = function(data) { return item.id === data.discussionId; };

      //loop through all root discussions and push their linking discussions directly below it in new array called displayArray
      for (var idx = 0; idx < rootDiscussions.length; idx++) {
        var item = rootDiscussions[idx];
        var discussions = arrayOfData.filter(filterDiscussions);

        displayArray.push(item);
        displayArray.push.apply(displayArray, discussions);
      }

      //filters attachments into separate array and shows attachment icon if discussion has attachment
      var attachments = arrayOfData.filter(function(data) { return data.parentId; });
      showAttachments(attachments, displayArray);
      return displayArray;
    }

    //show attachment icon if discussion has attachment
    function showAttachments(attachments, displayArray) {
      for (var i = 0; i < displayArray.length; i++) {
        for (var j = 0; j < attachments.length; j++) {
          if (displayArray[i].id === attachments[j].parentId) {
            displayArray[i].showAttachment = true;
            break;
          }
        }
      }
    }

    // give the styling for the discussions
    function addDiscussionStyling(arrayOfData) {
      var rootDiscussions = arrayOfData.filter(function(data) {
        return data.parentId === undefined && (data.discussionId === undefined || data.discussionId === null);
      });

      var filterDiscussions = function(data) {
        return arrayOfData[i].discussionId === data.discussionId;
      };

      var styledDiscussions = [];
      for (var i = 0; i < arrayOfData.length; i++) {
        if (styledDiscussions.indexOf(arrayOfData[i].discussionId) > -1 || arrayOfData[i].discussionId === undefined || arrayOfData[i].discussionId === null) continue;

        styledDiscussions.push(arrayOfData[i].discussionId);

        var discussion = arrayOfData.filter(filterDiscussions);

        var discussionArray = [];
        for (var j = 0; j < rootDiscussions.length; j++) {
          if (rootDiscussions[j].id === discussion[0].discussionId)
            discussionArray.push(rootDiscussions[j]);
        }

        discussionArray.push.apply(discussionArray, discussion);

        if(discussionArray.length > 1) {
          discussionArray.forEach(function(data) {
            data.showDiscussion = true;
          });
          discussionArray[0].discussionFirst = true;
          discussionArray[discussionArray.length - 1].discussionLast = true;
        } else {
          discussionArray[0].showDiscussion = false;
          discussionArray[0].discussionFirst = false;
          discussionArray[0].discussionLast = false;
        }
      }
      
    }

    function getTotal() {
      return data.length;
    }

    function getTotalWithFilters(filters, groupType) {
      if (filters && filters.length) {
        var list = getList(data, groupType);
        var filterData = filters.reduce(function(previousValue, currentValue) {
          return previousValue.filter(currentValue);
        }, list);
        return filterData.length;
      }
      return count;
    }

    // generate facet counts and total items count
    function getList(filterData, groupType) {
      // count is all those which dont have a parentId (not an attachment)
      if (groupType === "Group attachments")
        return filterData.filter(function(item) { return item.parentId === undefined; });
      // count is all items
      else if (groupType === "Expand attachments") {
        var parents = filterData.filter(function(item) {
          return item.parentId === undefined;
        });

        var list = [];
        for (var idx = 0; idx < parents.length; idx++) {
          list.push(parents[idx]);
          list = findChildren(parents[idx], filterData, list);
        }

        return list;
      }
      // return list as is
      else if (groupType === undefined || groupType === "Exact match")
        return filterData;
      // return all discussions
      else {
        var rootDiscussions = filterData.filter(function(item) { return item.parentId === undefined && item.discussionId === undefined; });
        var discussions = [];
        rootDiscussions.forEach(function(item) {   
          discussions = filterData.filter(function(data) { return item.id === data.discussionId && item.parentId === undefined; });
          rootDiscussions.push.apply(rootDiscussions, discussions);
        });

        return rootDiscussions;
      }

      // find the children for each item and add to list then return it
      function findChildren(currentParent, filterData, list) {
        var children = filterData.filter(function(data) { return currentParent.id === data.parentId; });

        if (children.length) {
          list.push.apply(list, children);
          for (var i = 0; i < children.length; i++) {
            list = findChildren(children[i], filterData, list);
          }
        }
        return list;
      }
    }

  }
})();
