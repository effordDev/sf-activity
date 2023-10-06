@isTest
public with sharing class ActivityHelperTest {
    
    @TestSetup
    static void makeData(){
        Account a = new Account();
            a.Name = 'ActivityHelperTest';
        insert a;
    }

    @isTest
    private static void getActivityTest(){
        Account a = [
            SELECT Id
            FROM Account
            LIMIT 1
        ];

        SObject account = ActivityHelper.getActivity(a.Id);
        System.assertEquals(a.Id, account.Id);
    }
}