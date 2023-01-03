import React from "react";
export const ContextReducer = React.createContext();

export const initialUserState = {
    userInfo: {
        "date": null,
        "ecommerceId": null,
        "email": null,
        "isAdmin": false,
        "token": null,
        "userId": null,
        "valid": false
    },
    pin: {
        email: null
    },
    reviews:{
        lastEvaluatedKey:null,
        keys:[],
        items:[],
        page:0
    },
    filters:{
        status:'PENDING',
        order:'newer',
        tags:null,
        orderUsers: 'newer',
        url:null,
        last: -1,
        orderFeaturedProducts: 'reviews',
        sortFeaturedProducts: 'desc',
        listType: 'default'
    },
    modal: {
        index: '',
        status: false
    },
    selecteds: [],
    notification: {
        status: false,
        role: ''
    },
    actualRoute:window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1] : 'insights',
    formAnswer: {},
    success: false,
    users:{
        lastEvaluatedKey:null,
        page: 0,
        items: [],
        keys:[]
    },
    featuredProducts:{
        lastEvaluatedKey:null,
        page: 0,
        items: [],
        keys:[]
    },
    attach: {
        index: '',
        status: false
    },
    isLoad: false,
    error: {
        email: false,
        pin: false,
        nouser: false
    },
    ecommerces:[],
    exportData: {
        loading: false,
        done: false
    },
    insights:{},
    orderInsightsItem: true,
    orderInsightsId: 0,
    firstAccess: false,
    graphic:{},
    moreCards: null,
    actualArea: 'store',
    typeEcommerce: {}
};

export const AdminReducer = (state, action) => {
    switch (action.type) {
        case 'SET_I18N':
            const _i18n = {...action.payload}
            return { ...state, i18n:_i18n};
        case 'SET_USERID':
            return { ...state, userInfo:action.payload};
        case 'SET_MODAL':
            return {...state, modal:action.payload};
        case 'SET_REVIEWS':
            const _reviews = action.payload;
            const _nextPage = !_reviews.nextPage ? 0 : _reviews.nextPage;

            _reviews.page = state.reviews.page + _nextPage;
            _reviews.keys = state.reviews.keys;

            if(_reviews.nextPage >= 0)
                _reviews.keys[_reviews.page + 1] = _reviews.lastEvaluatedKey;

            return {...state, reviews:_reviews};
        case 'SET_FILTERS':
            state.reviews.keys = [];
            state.reviews.nextPage = 0;
            state.reviews.page = 0;
            state.users.keys = [];
            state.users.nextPage = 0;
            state.users.page = 0;
            state.featuredProducts.keys = [];
            state.featuredProducts.nextPage = 0;
            state.featuredProducts.page = 0;

            const _newFilter = {...state.filters, ...action.payload}

            return {...state, filters:_newFilter, reviews:state.reviews, users:state.users, featuredProducts:state.featuredProducts};
        case 'SET_STATUS':
            const _reviewsStatus = {...state.reviews};

            for(let value in _reviewsStatus.items){
                for(let actValue in action.payload.items){
                    if(_reviewsStatus.items[value].author === action.payload.items[actValue].author && _reviewsStatus.items[value].id === action.payload.items[actValue].id){
                        _reviewsStatus.items[value] = {..._reviewsStatus.items[value], ...action.payload.items[actValue]}
                    }
                }
            }

            _reviewsStatus.totalTags = action.payload.totalTags

            return {...state, reviews:_reviewsStatus}

        case 'SET_ANSWER':
            const _questionReview = state.reviews;
            
            _questionReview.items.map((obj, index) => {

                if(obj.author === (action.payload.questionId || action.payload.reviewAuthor) && obj.id === action.payload.id){
                    const _answerArr = {
                        authorInfo:action.payload.authorInfo,
                        description:action.payload.description,
                        is_store:action.payload.is_store,
                        status:action.payload.status
                    }
                    
                    if(obj.childrenInfo) {
                        obj.childrenInfo.push(_answerArr);

                        obj.childrenInfo = obj.childrenInfo.filter((value, index, self) => (
                            index === self.findIndex(t => (
                                t.authorInfo.email === value.authorInfo.email && t.authorInfo.name ===  value.authorInfo.name && t.description === value.description
                            ))
                        ))
                    }

                    return obj;
                }
            })

            return {...state, formAnswer:action.payload, reviews: {..._questionReview}};
        case 'SET_SELECTEDS':
            const {obj, checked} = action.payload;
            let _selecteds = [...state.selecteds];

            if(!checked) {
                _selecteds = _selecteds.filter(item => {
                    return (item.author !== obj.author && item.id !== obj.id)
                })
            } else {
                _selecteds = [..._selecteds, obj]
            }
            return {...state, selecteds:_selecteds}
        case 'CLEAR_SELECTEDS':
            return {...state, selecteds:[]}
        case 'SET_NOTIFICATION':
            return {...state, notification:action.payload}
        case 'SET_ROUTE':
            return {...state, actualRoute:action.payload}
        case 'SET_SUCCESS':
            return {...state, success:action.payload}
        case 'SET_USERS':
            const _users = action.payload;

            _users.page = state.users.page + _users.nextPage;
            _users.keys = state.users.keys;

            if(_users.nextPage >= 0)
                _users.keys[_users.page + 1] = _users.lastEvaluatedKey;

            return {...state, users:_users}
        case 'SET_FEATURED_PRODUCTS':
            const _featuredProducts = action.payload;

            _featuredProducts.page = state.users.page + _featuredProducts.nextPage;
            _featuredProducts.keys = state.users.keys;

            if(_featuredProducts.nextPage >= 0)
                _featuredProducts.keys[_featuredProducts.page + 1] = _featuredProducts.lastEvaluatedKey;

            return {...state, featuredProducts:_featuredProducts}
        case 'SET_ATTACH':
            return {...state, attach:action.payload}
        case 'SET_ORDERINSIGHTSITEM':
            return {...state, orderInsightsItem:action.payload}
        case 'SET_ORDERINSIGHTSID':
            return {...state, orderInsightsId:action.payload}
        case 'SET_ISLOAD':
            return {...state, isLoad:action.payload}
        case 'SET_PIN':
            return {...state, pin:action.payload}
        case 'SET_ERROR':
            return {...state, error:action.payload}
        case 'GET_ECOMM':
            return {...state, ecommerces:action.payload}
        case 'GET_EXPORTDATA':
            return {...state, exportData:action.payload}
        case 'GET_DASHBOARD':
            return {...state, insights:action.payload}
        case 'GET_GRAPHIC':
            return {...state, graphic:action.payload}
        case 'SET_FIRSTACCESS':
            return {...state, firstAccess:action.payload}
        case 'SET_MORECARDS':
            return {...state, moreCards:action.payload}
        case 'SET_CUSTOMER':
            return {...state, typeEcommerce:action.payload}
        case 'SET_ACTUALAREA':
            return {...state, actualArea:action.payload}
        default:
            return state;
    }
};
