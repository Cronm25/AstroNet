import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { resetAdminProducts, getByPrice, getProductsByCategory, getAllProducts, setPageScrollinf, setpaginateProducts } from "../../../Redux/Slice";
import ProductCardModify from "./ProductCardModify";
import DropDownPicker from "react-native-dropdown-picker";
import SearchAdmin from "./SearchAdmin";
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AllAdmin = ({ route, navigation }) => {
    // ---------- dispatch ----------
    // si route.params existe en categories, busco por categoria
    const dispatch = useDispatch();
    // ---------- global states ----------
    let products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    let paginate = useSelector((state) => state.ALL_PRODUCTS.pageScrollinf);
    let paginateProducts = useSelector((state) => state.ALL_PRODUCTS.paginateProductsScrollinf)

    let [categories /*setCategories*/] = useState(
        useSelector((state) => state.ALL_PRODUCTS.categories)
    );

    // ---------- pickerUtils ----------
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(false);

    const [openprice, setOpenprice] = useState(false);
    const [valueprice, setValueprice] = useState(null);

    let pickerSort = [
        { label: "higher", value: "higher" },
        { label: "lower", value: "lower" },
    ];
    let pickerItems = [{label:"all Products", value:"all Products"}];
    categories.length
        ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
        : null;

    //update
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(setpaginateProducts([])),
        dispatch(setPageScrollinf(1))
    }, [getAllProducts]);
    

    useEffect(() => {
        loadMoreItem();
    }, [products]);

    // ---------- handlers ----------

    function handleCategory(e) {
        e.value === "all Products"?
        (dispatch(setpaginateProducts([])), dispatch(setPageScrollinf(1)), dispatch(resetAdminProducts(e.value))) :
        (dispatch(setpaginateProducts([])), dispatch(setPageScrollinf(1)), dispatch(getProductsByCategory(e.value)));
    }

    function handlePrice(e) {
        dispatch(setpaginateProducts([]));
        dispatch(setPageScrollinf(1));
        dispatch(getByPrice(e.value));

    }

      // ------------ LOADER ----------
    const [isLoading, setIsLoading] = useState(true);

    const renderLoader = () => {
        return isLoading ? (
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#aaa" />
        </View>
        ) : null;
    };

    // ---------- paginate ----------
    const productsPerPage = 6;

    const indexOfLast = paginate * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;

    const nextPage = () => {
        if (products?.length > 1) {
            dispatch(setpaginateProducts([
            ...paginateProducts,
            ...products.slice(indexOfFirst, indexOfLast),
            ]));
        }
    };

    const loadMoreItem = () => {
        dispatch(setPageScrollinf(paginate+1))////
        nextPage();
        products.length === paginateProducts.length
            ? setIsLoading(false)
            : setIsLoading(true);
    };
    
    
    return (

            <View style={styles.container}>
                {/* ------------ TITLE ------------ */}
                <View style={styles.SBcontainer}>
                    <View style={styles.SB}>
                        <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()}/>
                        <SearchAdmin navigation={navigation} route={route} setpaginateProducts={setpaginateProducts} />
                    </View>
                </View>
                {valueitems?
                    <Text style={styles.title}>{valueitems}</Text>
                :null}

                {/* ------------ FILTERS ------------ */}
                <View style={styles.selectsContainer}>
                    {/* ------------Select category------------- */}
                    <View style={styles.selects}>
                        <View>
                            <Text>Filter by: </Text>
                        </View>
                        <DropDownPicker
                            open={openitems}
                            value={valueitems}
                            items={pickerItems}
                            setOpen={setOpenitems}
                            setValue={setValueitems}
                            onSelectItem={(value) => handleCategory(value)}
                        />
                    </View>

                    {/* ------------order By Price------------- */}
                    <View style={styles.selects}>
                        <View>
                            <Text>Order by: </Text>
                        </View>
                        <DropDownPicker
                            open={openprice}
                            value={valueprice}
                            items={pickerSort}
                            setOpen={setOpenprice}
                            setValue={setValueprice}
                            onSelectItem={(value) => handlePrice(value)}
                        />
                    </View>
                </View>

                {/* ------------ PRODUCTS CARDS ------------ */}
                <FlatList
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    style={styles.flatList}
                    numColumns={2}
                    data={paginateProducts}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => loadMoreItem()}
                    ListFooterComponent={renderLoader}
                    renderItem={({ item }) => (
                        <View >
                            <ProductCardModify navigation={navigation} item={item} />
                        </View>
                    )}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%',
        marginBottom:'5%'
    },
    SB: {
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        height:'65%',
        backgroundColor: '#4A347F',
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
    },
    selectsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    selects: {
        flexDirection: "column",
        margin: 10,
        width: "40%",
    },
    flatList: {
        marginTop: 0,
        padding: 0,
        width: "100%",
    },
    title: {
        fontSize: 20,
        padding: 5,
        textAlign: "center",
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '75%',
        height: 20,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
});

export default AllAdmin;
