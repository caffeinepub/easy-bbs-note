import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  type ExamTip = {
    subject : Text;
    year : Nat;
    tip : Text;
  };

  type ResourceType = {
    #notes;
    #pastQuestion;
    #solution;
    #syllabus;
    #pdf;
  };

  type Resource = {
    title : Text;
    url : Text;
    resourceType : ResourceType;
    subject : Text;
    year : Nat;
  };

  type ContributorStatus = { #pending; #approved; #rejected };

  type ContributorRequest = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    description : Text;
    status : ContributorStatus;
    createdAt : Time.Time;
  };

  module ContributorRequest {
    public func compare(contributorRequest1 : ContributorRequest, contributorRequest2 : ContributorRequest) : Order.Order {
      Nat.compare(contributorRequest1.id, contributorRequest2.id);
    };
  };

  let tipEntries = List.empty<ExamTip>();
  let resourceEntries = List.empty<Resource>();
  let contributorRequests = Map.empty<Nat, ContributorRequest>();

  var nextContributorId = 1;

  public shared ({ caller }) func submitContributorRequest(name : Text, email : Text, subject : Text, description : Text) : async Nat {
    let requestId = nextContributorId;
    let newRequest : ContributorRequest = {
      id = requestId;
      name;
      email;
      subject;
      description;
      status = #pending;
      createdAt = Time.now();
    };
    contributorRequests.add(requestId, newRequest);
    nextContributorId += 1;
    requestId;
  };

  public query ({ caller }) func getAllContributorRequests() : async [ContributorRequest] {
    contributorRequests.values().toArray().sort();
  };

  public query ({ caller }) func getPendingContributorRequests() : async [ContributorRequest] {
    let filtered = contributorRequests.values().filter(func(req) { req.status == #pending });
    filtered.toArray().sort();
  };

  public query ({ caller }) func getApprovedContributors() : async [ContributorRequest] {
    let filtered = contributorRequests.values().filter(func(req) { req.status == #approved });
    filtered.toArray().sort();
  };

  public shared ({ caller }) func updateContributorStatus(id : Nat, status : ContributorStatus) : async () {
    switch (contributorRequests.get(id)) {
      case (null) { Runtime.trap("Contributor request not found") };
      case (?request) {
        let updatedRequest = {
          id = request.id;
          name = request.name;
          email = request.email;
          subject = request.subject;
          description = request.description;
          status;
          createdAt = request.createdAt;
        };
        contributorRequests.add(id, updatedRequest);
      };
    };
  };

  public shared ({ caller }) func seedData() : async () {
    tipEntries.clear();
    resourceEntries.clear();
    contributorRequests.clear();
    nextContributorId := 1;

    // Exam Tips
    let tips : [ExamTip] = [
      {
        subject = "Financial Accounting";
        year = 1;
        tip = "Focus on basic accounting principles and practice balancing ledgers.";
      },
      {
        subject = "Microeconomics";
        year = 1;
        tip = "Understand supply and demand curves thoroughly. Graphs and their movements are frequently asked.";
      },
      {
        subject = "Business Law";
        year = 2;
        tip = "Memorize key contract terms and the difference between valid, void, and voidable contracts.";
      },
      {
        subject = "Finance";
        year = 3;
        tip = "Understand concepts like time value of money and capital budgeting techniques with examples.";
      },
      {
        subject = "Marketing";
        year = 4;
        tip = "Familiarize yourself with the 4 P's of marketing (Product, Price, Place, Promotion) and write clear definitions.";
      },
      {
        subject = "Statistics";
        year = 2;
        tip = "Practice numerical questions involving mean, median, mode, regression, and correlation analysis.";
      },
      {
        subject = "Business Communication";
        year = 1;
        tip = "Focus on the structure of business letters, reports, and memos. Understand different communication models.";
      },
    ];
    tipEntries.addAll(tips.values());

    // Resources
    let resources : [Resource] = [
      // Year 1
      {
        title = "Financial Accounting Notes";
        url = "https://bbsnepal.com/resources/financial-accounting-notes.pdf";
        resourceType = #notes;
        subject = "Financial Accounting";
        year = 1;
      },
      {
        title = "Microeconomics Past Questions";
        url = "https://bbsnepal.com/resources/microeconomics-past-questions.pdf";
        resourceType = #pastQuestion;
        subject = "Microeconomics";
        year = 1;
      },
      {
        title = "Business Law Syllabus";
        url = "https://bbsnepal.com/resources/business-law-syllabus.pdf";
        resourceType = #syllabus;
        subject = "Business Law";
        year = 1;
      },

      // Year 2
      {
        title = "Statistics Solutions";
        url = "https://bbsnepal.com/resources/statistics-solutions.pdf";
        resourceType = #solution;
        subject = "Statistics";
        year = 2;
      },
      {
        title = "Business Mathematics Notes";
        url = "https://bbsnepal.com/resources/business-mathematics-notes.pdf";
        resourceType = #notes;
        subject = "Business Mathematics";
        year = 2;
      },
      {
        title = "Economics Syllabus";
        url = "https://bbsnepal.com/resources/economics-syllabus.pdf";
        resourceType = #syllabus;
        subject = "Economics";
        year = 2;
      },

      // Year 3
      {
        title = "Financial Management Past Papers";
        url = "https://bbsnepal.com/resources/financial-management-past-papers.pdf";
        resourceType = #pastQuestion;
        subject = "Financial Management";
        year = 3;
      },
      {
        title = "Marketing Concept Notes";
        url = "https://bbsnepal.com/resources/marketing-concept-notes.pdf";
        resourceType = #notes;
        subject = "Marketing";
        year = 3;
      },
      {
        title = "Economics Solutions";
        url = "https://bbsnepal.com/resources/economics-solutions.pdf";
        resourceType = #solution;
        subject = "Economics";
        year = 3;
      },

      // Year 4
      {
        title = "Business Economics Past Questions";
        url = "https://bbsnepal.com/resources/business-economics-past-questions.pdf";
        resourceType = #pastQuestion;
        subject = "Business Economics";
        year = 4;
      },
      {
        title = "Business Communication Notes";
        url = "https://bbsnepal.com/resources/business-communication-notes.pdf";
        resourceType = #notes;
        subject = "Business Communication";
        year = 4;
      },
      {
        title = "Marketing Management Syllabus";
        url = "https://bbsnepal.com/resources/marketing-management-syllabus.pdf";
        resourceType = #syllabus;
        subject = "Marketing Management";
        year = 4;
      },

      // Additional PDFs
      {
        title = "Business Law PDF";
        url = "https://bbsnepal.com/resources/business-law.pdf";
        resourceType = #pdf;
        subject = "Business Law";
        year = 2;
      },
      {
        title = "Financial Accounting PDF";
        url = "https://bbsnepal.com/resources/financial-accounting.pdf";
        resourceType = #pdf;
        subject = "Financial Accounting";
        year = 1;
      },
      {
        title = "Marketing PDF";
        url = "https://bbsnepal.com/resources/marketing.pdf";
        resourceType = #pdf;
        subject = "Marketing";
        year = 3;
      },
    ];
    resourceEntries.addAll(resources.values());

    // Contributor Requests
    let contributors : [ContributorRequest] = [
      {
        id = 1;
        name = "Prajwal Shrestha";
        email = "prajwal.shrestha@gmail.com";
        subject = "Financial Accounting";
        description = "I want to contribute in the area of Financial Accounting. I am a BBS Syallabus and Notes Expert. for BBS year 1.";
        status = #approved;
        createdAt = Time.now();
      },
      {
        id = 2;
        name = "Nikita Shrestha";
        email = "nikita.shrestha@gmail.com";
        subject = "Business Law";
        description = "I am a law student and would like to share my notes for BBS students.";
        status = #approved;
        createdAt = Time.now();
      },
      {
        id = 3;
        name = "Anish Thapa";
        email = "anish.thapa@gmail.com";
        subject = "Economics";
        description = "I'm passionate about simplifying economics concepts for BBS students.";
        status = #approved;
        createdAt = Time.now();
      },
      {
        id = 4;
        name = "Sital Karki";
        email = "sital.karki@gmail.com";
        subject = "Marketing";
        description = "Interested in sharing marketing strategies and case studies for BBS.";
        status = #approved;
        createdAt = Time.now();
      },
    ];

    for (contributor in contributors.values()) {
      contributorRequests.add(contributor.id, contributor);
      nextContributorId += 1;
    };
  };
};
