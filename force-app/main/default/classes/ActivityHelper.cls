public without sharing class ActivityHelper {
    
    @AuraEnabled
    public static SObject getActivity(String recordId) {
        // try {

            if (recordId == null || recordId == '') {
                return null;
            }

            Id sobId = recordId;

            String sobjectName = sobId.getSObjectType().getDescribe().getName();
            String query = 'SELECT Id, ';
                query += '(' +
                    'SELECT Id, ' +
                    'CreatedDate, ' +
                    'What.Name, ' +
                    'Who.Name, ' +
                    'Status, ' + 
                    'Subject, ' + 
                    'Type, ' + 
                    'TaskSubtype, ' + 
                    'ActivityDate, ' + 
                    'CompletedDateTime, ' + 
                    'Description ' +
                    'FROM Tasks' + 
                '),';
                query += '(' + 
                    'SELECT Id, ' +
                    'CreatedDate, ' +
                    'What.Name, ' +
                    'Who.Name, ' +
                    'Subject, ' +
                    'Type, ' +
                    'EventSubtype, ' +
                    'ActivityDateTime, ' +
                    'StartDateTime, ' +
                    'EndDateTime, ' +
                    'Description ' +
                    'FROM Events' +
                ')';
            query += 'FROM ' + sobjectName + ' ';
            query += 'WHERE Id = : recordId';
            query += ' LIMIT 1';

            return Database.query(query);
           
        // } catch (Exception e) {
        //     throw new AuraHandledException(e.getMessage());
        // }
    }
}