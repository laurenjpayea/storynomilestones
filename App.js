Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //Write app code here
	    Ext.create('Rally.data.wsapi.Store', {
	        model: 'userstory',
	        autoLoad: true,
	        listeners: {
	          load: this._onDataLoaded,
	          scope: this
	        },
	        fetch: ['FormattedID', 'Name', 'Owner', 'Milestones', 'Iteration', 'Release', 'ScheduleState'],
     	});
    },
    _onDataLoaded: function(store, data) {
    	store.filterBy( function (record) {
    		if (record.get('Milestones').Count === 0) {
      			return true;
      		} else {
      			return false;
      		}
    	});
   	    this.remove('g1');
	    this.add({
	        xtype: 'rallygrid',
            itemId: 'g1',
	        columnCfgs: [
	            'FormattedID',
	            'Name',
	            'Owner',
	            'Release',
	            'Iteration',
	            'ScheduleState',
	            'Milestones'
	        ],
	        context: this.getContext(),
	        enableEditing: false,
	        showRowActionsColumn: false,
      		store: store
	    });

    }

        //API Docs: https://help.rallydev.com/apps/2.1/doc/
});
