# Diploma Supplement Portal

##Greek Version
Το έργο αναπτύχθηκε για τις ανάγκες του έργου "No INEA/CEF/ICT/A2015/1147836", από το "Information Management Lab (i4M Lab)", το οποίο αποτελεί μέρος της Ερευνητικής Ομάδας "ATLANTIS Group".

- Σχετικά με την Ερευνητική Ομάδα "ATLANTIS Group" επισκεφθείτε την ιστοσελίδα: http://www.atlantis-group.gr/
- Για νέα σχετικά με την εξέλιξη του έργου επισκεφθείτε την ιστοσελίδα: https://ma.ellak.gr/forge/projects/jobselection_iap
<!-- /- Για την χρήση της εφαρμογής επισκεφθείτε την ιστοσελίδα: http://iap.atlantis-group.gr/TestJobSelection/home.php -->


### Σκοπός του έργου

Σκοπός του έργου είναι η δημιουργία κατάλληλης υποδομής για την ασφαλή δημοσίευση "Αντιγράφων Διπλώματος" ("Diploma Supplements") των φοιτητών του πανεπιστημίου Αιγαίου, ενώ πράλληλα να προσφέρει ένα εύκολο τρόπο εισαγωγής νέων πανεπιστημίων. Η ταυτοποίηση και σύνδεση των φοιτητών στο σύστημα γίνεται μέσω της υποδομής του eIDAS (https://ec.europa.eu/digital-single-market/en/policies/trust-services-and-eidentification). Αφού ταυτοποιηθεί ο χρήστης μπορεί να ζητήσει τη δημοσιοποίηση των Αντιγράφων Διπλώματος του στο σύστημα. Σε αυτό το στάδιο μόνο ο χρήστης μπορεί να προσπελάσει τα Αντίγραφα Διπλωμάτων του. Στη συνέχεια μπορεί παραχωρήσει πρόσβαση σε αυτά με τη μορφή προσκλήσεων είτε μέσω email είτε μέσω QR codes, χρησιμοποιώντας σαν αναγνωριστικό το email του παραλλήπτη. Οι προσκλήσεις αυτές "κλειδώνοται"από τον παραλήπτη και δεν είναι δυνατό να διαμοιραστούν σε τρίτους.


Για τη διασφάληση της ορθότητας των στοιχείων, την προστασία τους από την παραποίηση καθώς και για τη διασφάληση και προστασία του απορρήτου τους,  αντί να αποθηκεύονται τα "Αντίγραφα Διπλώματος" σε μια απλή βάση δεδομέων, αποθηκεύονται σε ένα κατάλληλα διαμορφομένο blockchain στο οποίο συμμετέχουν όλα τα πανεπιστήμια του συστήματος. Το blockchain αυτό είναι υλοποιημένο χρησιμοποιώντας το ανοικό λογισμικό του HyperLedger Fabric (https://www.hyperledger.org/).


### Περιεχόμενα του αποθετηρίου [Παραδοτέων]

Το αποθετήριο είναι χωρισμένο στα εξής μέρη:

**  *dsIss **, περιέχει ένα mircoservice το οποίο δρα σαν trust anchor στο σύστημα, και αλληλεπιδρά με τον eIDAS κόμβο της Ελλάδας για να ταυτοποιήσει τους χρήστες (υλοποίηση Java/Spring boot, https://projects.spring.io/spring-boot/)
** *studentApp **, περιέχει ένα  microservice  το οποίο παρέχει το UI των χρηστών και χειρίζεται την αλληλεπίδρασή τους με το blockchain. Αλληλεπιδρά με το με το loginWebApp microservice μέσω REST api. Υλοπoίηση με nodejs/Express (https://expressjs.com/)
** *univApp**, περιέχει ένα microservice το οποίο παρακολουθεί το blokchain και δρα εκ μέρους του πανεπιστημίου του Αιγαίου. Υλοπoίηση με nodejs/Express (https://expressjs.com/)
** *univBackEnd**, περιέχει ένα microservice οποίο παρέχει τη σύνδεση με τη βάση δεδομένων του πανεπιστημίου του Αιγαίου. Αλληλεπιδρά με το univApp μέσω gRPC (https://grpc.io/). Υλοπoίηση με nodejs/Express (https://expressjs.com/)
**  *hlfNetwork**, περιέχει τα αναγκαία αρχεία ρυθμίσεων για τη δημιουργία του blockchain. Έιναι αναγκαία η χρήση docker (https://www.docker.com/), docker-compose(https://docs.docker.com/compose/) και docker-swarm(https://docs.docker.com/engine/swarm/).



### ReadMe.docx

Περιλαμβάνει υλικό σχετικό με την ανάπτυξη του έργου, ιδιαίτερα χρήσιμο για την κατανόηση των αρχείων κώδικα. Σχετικά με τη λήψη του αρχείου αυτού επισκεφθείτε την ιστοσελίδα:
<!-- https://github.com/ellak-monades-aristeias/jobselection_iap/blob/master/ReadMe.docx -->

### Αρχεία κώδικα

Περιλαμβάνει τα αρχεία κώδικα που χρησιμοποιήθηκαν για την ανάπτυξη της εφαρμογής "Job Selection - IAP".
<!-- - https://github.com/ellak-monades-aristeias/jobselection_iap -->
