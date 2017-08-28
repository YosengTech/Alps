export const ADMIN_MENU = [
    {
        path: 'admin',
        children: [
            {
                path: 'dashboard',
                data: {
                    menu: {
                        title: '仪表板',
                        icon: 'ion-android-home',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'supplier',
                data: {
                    menu: {
                        title: '供应商管理',
                        icon: 'ion-edit',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'list',
                        data: {
                            menu: {
                                title: '供应商列表',
                            }
                        }
                    },
                    {
                        path: 'edit',
                        data: {
                            menu: {
                                title: '供应商编辑',
                            }
                        }
                    }
                ]
            },
            {
                path: 'product',
                data: {
                    menu: {
                        title: '物品管理',
                        icon: 'ion-edit',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [   
                    {
                        path: 'catagorylist',
                        data: {
                            menu: {
                                title: '物品类别列表',
                            }
                        }
                    },
                    {
                        path: 'catagoryedit',
                        data: {
                            menu: {
                                title: '物品类别编辑',
                            }
                        }
                    },
                    {
                        path: 'list',
                        data: {
                            menu: {
                                title: '物品列表',
                            }
                        }
                    },
                    {
                        path: 'edit',
                        data: {
                            menu: {
                                title: '物品编辑',
                            }
                        }
                    },
                    {
                        path: 'skulist',//'productsku/list',
                        data: {
                            menu: {
                                title: '物品Sku列表',
                            }
                        }
                    },
                    {
                        path: 'skuedit',
                        data: {
                            menu: {
                                title: '物品Sku编辑',
                            }
                        }
                    }
                ]
            },
            {
                path: 'purchase',
                data: {
                    menu: {
                        title: '采购管理',
                        icon: 'ion-edit',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'list',
                        data: {
                            menu: {
                                title: '订单列表',
                            }
                        }
                    },
                    {
                        path: 'edit',
                        data: {
                            menu: {
                                title: '新建订单',
                            }
                        }
                    }
                ]
            },
            {
                path: 'stock',
                data: {
                    menu: {
                        title: '仓储管理',
                        icon: 'ion-edit',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'stocklist',
                        data: {
                            menu: {
                                title: '库存列表',
                            }
                        }
                    },
                    {
                        path: 'stockinlist',
                        data: {
                            menu: {
                                title: '入库记录',
                            }
                        }
                    },
                    {
                        path: 'stockin',
                        data: {
                            menu: {
                                title: '入库登记',
                            }
                        }
                    },
                    {
                        path: 'stockoutlist',
                        data: {
                            menu: {
                                title: '出库记录',
                            }
                        }
                    }
                    ,
                    {
                        path: 'stockout',
                        data: {
                            menu: {
                                title: '出库登记',
                            }
                        }
                    }
                ]
            },
            {
                path: 'editors',
                data: {
                    menu: {
                        title: 'Editors',
                        icon: 'ion-edit',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'ckeditor',
                        data: {
                            menu: {
                                title: 'CKEditor',
                            }
                        }
                    }
                ]
            },
            {
                path: 'components',
                data: {
                    menu: {
                        title: 'Components',
                        icon: 'ion-gear-a',
                        selected: false,
                        expanded: false,
                        order: 250,
                    }
                },
                children: [
                    {
                        path: 'treeview',
                        data: {
                            menu: {
                                title: 'Tree View',
                            }
                        }
                    }
                ]
            },
            {
                path: 'charts',
                data: {
                    menu: {
                        title: 'Charts',
                        icon: 'ion-stats-bars',
                        selected: false,
                        expanded: false,
                        order: 200,
                    }
                },
                children: [
                    {
                        path: 'chartist-js',
                        data: {
                            menu: {
                                title: 'Chartist.Js',
                            }
                        }
                    }
                ]
            },
            {
                path: 'ui',
                data: {
                    menu: {
                        title: 'UI Features',
                        icon: 'ion-android-laptop',
                        selected: false,
                        expanded: false,
                        order: 300,
                    }
                },
                children: [
                    {
                        path: 'typography',
                        data: {
                            menu: {
                                title: 'Typography',
                            }
                        }
                    },
                    {
                        path: 'buttons',
                        data: {
                            menu: {
                                title: 'Buttons',
                            }
                        }
                    },
                    {
                        path: 'icons',
                        data: {
                            menu: {
                                title: 'Icons',
                            }
                        }
                    },
                    {
                        path: 'modals',
                        data: {
                            menu: {
                                title: 'Modals',
                            }
                        }
                    },
                    {
                        path: 'grid',
                        data: {
                            menu: {
                                title: 'Grid',
                            }
                        }
                    },
                ]
            },
            {
                path: 'forms',
                data: {
                    menu: {
                        title: 'Form Elements',
                        icon: 'ion-compose',
                        selected: false,
                        expanded: false,
                        order: 400,
                    }
                },
                children: [
                    {
                        path: 'inputs',
                        data: {
                            menu: {
                                title: 'Form Inputs',
                            }
                        }
                    },
                    {
                        path: 'layouts',
                        data: {
                            menu: {
                                title: 'Form Layouts',
                            }
                        }
                    }
                ]
            },
            {
                path: 'tables',
                data: {
                    menu: {
                        title: 'Tables',
                        icon: 'ion-grid',
                        selected: false,
                        expanded: false,
                        order: 500,
                    }
                },
                children: [
                    {
                        path: 'basictables',
                        data: {
                            menu: {
                                title: 'Basic Tables',
                            }
                        }
                    },
                    {
                        path: 'smarttables',
                        data: {
                            menu: {
                                title: 'Smart Tables',
                            }
                        }
                    }
                ]
            },
            {
                path: 'maps',
                data: {
                    menu: {
                        title: 'Maps',
                        icon: 'ion-ios-location-outline',
                        selected: false,
                        expanded: false,
                        order: 600,
                    }
                },
                children: [
                    {
                        path: 'googlemaps',
                        data: {
                            menu: {
                                title: 'Google Maps',
                            }
                        }
                    },
                    {
                        path: 'leafletmaps',
                        data: {
                            menu: {
                                title: 'Leaflet Maps',
                            }
                        }
                    },
                    {
                        path: 'bubblemaps',
                        data: {
                            menu: {
                                title: 'Bubble Maps',
                            }
                        }
                    },
                    {
                        path: 'linemaps',
                        data: {
                            menu: {
                                title: 'Line Maps',
                            }
                        }
                    }
                ]
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'Pages',
                        icon: 'ion-document',
                        selected: false,
                        expanded: false,
                        order: 650,
                    }
                },
                children: [
                    {
                        path: ['/login'],
                        data: {
                            menu: {
                                title: 'Login'
                            }
                        }
                    },
                    {
                        path: ['/register'],
                        data: {
                            menu: {
                                title: 'Register'
                            }
                        }
                    }
                ]
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'Menu Level 1',
                        icon: 'ion-ios-more',
                        selected: false,
                        expanded: false,
                        order: 700,
                    }
                },
                children: [
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'Menu Level 1.1',
                                url: '#'
                            }
                        }
                    },
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'Menu Level 1.2',
                                url: '#'
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'Menu Level 1.2.1',
                                        url: '#'
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'External Link',
                        url: 'http://akveo.com',
                        icon: 'ion-android-exit',
                        order: 800,
                        target: '_blank'
                    }
                }
            }
        ]
    }
];
