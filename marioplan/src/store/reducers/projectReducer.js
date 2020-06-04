const initState ={}
  
  const projectReducer = (state = initState, action) => {
        switch(action.type){
            case 'CREATE_PROJECT':
              console.log('create post', action.project)
              return state;
            case 'CREATE_PROJECT_ERROR':
              console.log('create_post_failed', action.err)
              return state;
            default:
              return state;
        }    
  };
  
  export default projectReducer;