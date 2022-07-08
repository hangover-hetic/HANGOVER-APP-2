import React from 'react';
import { View, Text, TextInput, StyleSheet,SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchFriends } from '../redux/User/userAsync-actions';
import Container from '../components/ui/ScrollContainer';
import Title from '../components/semantics/Title';
import SectionTitle from '../components/semantics/SectionTitle';
import Span from '../components/semantics/Span';
import WhiteSpan from '../components/semantics/WhiteSpan';
import { FontAwesome5,AntDesign, Feather   } from '@expo/vector-icons'; 
import CustomButton from '../components/CustomButton';


class Friends extends React.Component {
    state = {
        email: '',
        friends: []
    }
    handleEmail = (text) => {
        this.setState({ email: text })
     }
     async componentDidMount() {
        const { dispatch } = this.props;
        this.state.friends = this.props.userFriends;
        /* this.state.email = this.props.user.email; */
        await dispatch(fetchFriends(this.props.user.id));
        
      }
  render() {
    
    return (
      <Container>
        <Title content='Mes amis'/>
        <View>
            <SectionTitle content='Mon pseudonyme'/>
            {/* <Span content={this.state.email}/> */}
        </View>
        <View>
            <SectionTitle content='Ajouter un ami'/>
            <WhiteSpan content='Email de votre ami'/>
            <View style = {styles.searchSection}>
                <FontAwesome5 name="user-friends" size={16} color='#9d9d9d' />
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#9d9d9d"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail}/>
            </View>
            <CustomButton title='Ajouter cet amis'/>
            
        </View>
        <View>
            <SectionTitle content="Liste d'amis"/>
            <SafeAreaView style={styles.container}>
                <FlatList data={this.state.friends} keyExtractor={(item, index) => String(index)} renderItem={({item}) => {
                      return (
                        
                          <View style={styles.itemList}>
                            <View style={styles.itemListContent}>
                                <Image style={styles.avatar} source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}/>
                                <Text style={styles.username}>@{item.firstName} {item.lastName}</Text>
                            </View>
                            <Feather style={{paddingHorizontal: 5}} name="map-pin" size={22} color="white" />
                            <AntDesign name="deleteuser" size={26} color="#ff4848" />
                          </View>
                      )
                  }}/>
            </SafeAreaView>
        </View>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    searchSection: {
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#9d9d9d',
        marginBottom: 20
    },

    input: {
       flex: 3,
       height: 40,
       marginLeft: 7,
       color: '#9d9d9d'
    },

    itemList: {
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderColor: '#9d9d9d',
        height: 60,
        alignItems:'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 5
    },
    itemListContent: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "#FFFFFF",

    },
    username: {
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Poppins-SemiBold',
        
    }
 })

 const mapStateToProps = (state) => ({
    user: state.userReducer.actualUser,
    userFriends: state.userReducer.userFriends
  });


 const FriendsConnected = connect(mapStateToProps)(Friends);

export default FriendsConnected;