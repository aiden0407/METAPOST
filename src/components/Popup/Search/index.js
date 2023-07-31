//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column } from 'components/Flex';

//Api
import { searchContents } from 'apis/Home';

//Assets
import arrowBackIcon from 'assets/icons/arrow_back.svg';
import fireInactiveIcon from 'assets/icons/fire_inactive.svg';
import fireColorIcon from 'assets/icons/fire_color.svg';
import nftIcon from 'assets/icons/icon_nft.png';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function Search() {

  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState('community');
  const [searchResult, setSearchResult] = useState([]);

  function handleSearchClose() {
    dispatch({ type: 'CLOSE_SEARCH_POPUP' });
  }

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length) {
      handleSearch(e.target.value, selectedOption);
    }
  };

  function handleSelectedOption(type) {
    setSelectedOption();
    setSearchResult([]);
    if (searchText.length) {
      handleSearch(searchText, type);
    } else {
      setSelectedOption(type);
    }
  }

  const handleSearch = async function (text, type) {
    try {
      const response = await searchContents(text, type);
      setSearchResult(response.data);
      setSelectedOption(type);
    } catch (error) {
      alert(error);
    }
  };

  const handleImageError = (error) => {
    error.target.src = defaultProfile;
  }

  return (
    <PopupContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <StyledImage src={arrowBackIcon} width={24} onClick={() => handleSearchClose()} />
          <SearchInput
            value={searchText}
            onChange={handleTextChange}
            onFocus={() => setIsToggleOpened(true)}
            placeholder='Search'
          />
        </HeaderWrapper>
      </HeaderContainer>

      {
        isToggleOpened && <SearchTapWrapper>
          <SearchTap>
            <TapRow
              onClick={() => { handleSelectedOption('community') }}
              selected={selectedOption === 'community'}
            >
              <Image src={selectedOption === 'community' ? fireColorIcon : fireInactiveIcon} width={16} />
              <Text B1 color={selectedOption === 'community' ? COLOR.N800 : COLOR.N600} marginTop={1} marginLeft={4}>Community</Text>
            </TapRow>
            <TapRow
              onClick={() => handleSelectedOption('post')}
              selected={selectedOption === 'post'}
            >
              <Image src={selectedOption === 'post' ? fireColorIcon : fireInactiveIcon} width={16} />
              <Text B1 color={selectedOption === 'post' ? COLOR.N800 : COLOR.N600} marginTop={1} marginLeft={4}>Post</Text>
            </TapRow>
            <TapRow
              onClick={() => handleSelectedOption('user')}
              selected={selectedOption === 'user'}
            >
              <Image src={selectedOption === 'user' ? fireColorIcon : fireInactiveIcon} width={16} />
              <Text B1 color={selectedOption === 'user' ? COLOR.N800 : COLOR.N600} marginTop={1} marginLeft={4}>User</Text>
            </TapRow>
          </SearchTap>
        </SearchTapWrapper>
      }
      {
        searchText
          ? <ResultWrapper>
            {
              searchResult?.length
                ? <>
                  {
                    selectedOption === 'community' && <>
                      <ResultColumnCommunity>
                        {
                          searchResult.map((item) =>
                            <StyledRow
                              key={`community_${item.pk}`}
                              onClick={() => {
                                navigate(`/community?community_id=${item.pk}`);
                                window.scrollTo({ top: 0 });
                                handleSearchClose();
                              }}
                            >
                              <Image src={item.fields.logo_url} width={33} height={33} borderRadius="4px" onError={handleImageError} />
                              <Text B0 color={COLOR.N800} marginLeft={8}>{item.fields.title}</Text>
                            </StyledRow>
                          )
                        }
                      </ResultColumnCommunity>
                    </>
                  }
                  {
                    selectedOption === 'post' && <>
                      <ResultColumnPost>
                        {
                          searchResult.map((item) =>
                            <StyledColumn
                              key={`post_${item.pk}`}
                              gap={4}
                              onClick={() => {
                                navigate(`/post?post_id=${item.pk}`);
                                window.scrollTo({ top: 0 });
                                handleSearchClose();
                              }}
                            >
                              <Text B0 color={COLOR.N800}>{item.fields.title}</Text>
                              <Text B0 color={COLOR.N600}>{item.fields.description}</Text>
                            </StyledColumn>
                          )
                        }
                      </ResultColumnPost>
                    </>
                  }
                  {
                    selectedOption === 'user' && <>
                      <ResultColumnUser>
                        {
                          searchResult.map((item) =>
                            <StyledRow
                              key={`user_${item.pk}`}
                              gap={4}
                              onClick={() => {
                                navigate(`/profile?profile_id=${item.pk}`);
                                window.scrollTo({ top: 0 });
                                handleSearchClose();
                              }}
                            >
                              <Image src={item.fields?.nft_thumbnail ?? defaultProfile} width={33} height={33} borderRadius="4px" />
                              <Column marginLeft={8} gap={4}>
                                <Text B2 color={COLOR.N600} style={{ lineHeight: '100%' }}>{item.fields.nickname}</Text>
                                <Row>
                                  <Image src={nftIcon} width={16} />
                                  <Text B3 medium color={COLOR.N600} marginLeft={4}>{item.fields.nft_name}</Text>
                                </Row>
                              </Column>
                            </StyledRow>
                          )
                        }
                      </ResultColumnUser>
                    </>
                  }
                </>
                : <NoResultArea>
                  {
                    selectedOption && <Text H5 color={COLOR.N700}>No Result</Text>
                  }
                </NoResultArea>
            }
          </ResultWrapper>
          : <TouchableArea
            onClick={() => {
              if (!searchText) {
                setIsToggleOpened(false);
                if (!isToggleOpened) {
                  handleSearchClose();
                }
              }
            }}
          />
      }

    </PopupContainer>
  )
}

export default Search

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
`

const HeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  border-bottom: 2px solid ${COLOR.N400};
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;
`

const SearchInput = styled.input`
  margin-left: 8px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  &::placeholder {
    color: ${COLOR.N600};
  }
`;

const SearchTapWrapper = styled.div`
  margin-top: 48px;
  width: 100%;
  height: 34px;
  background-color: #FFFFFF;
  border-bottom: 1px solid ${COLOR.N400};
  display: flex;
  justify-content: center;
`

const SearchTap = styled.div`
  margin-top: 1px;
  width: 100%;
  max-width: 640px;
  height: 100%;
  display: flex;
  gap: 4px;
`

const ResultWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
`

const ResultColumnCommunity = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const ResultColumnPost = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ResultColumnUser = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const NoResultArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TouchableArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`

const TapRow = styled(Row)`
  padding: 0 13px 0 11px;
  border-bottom: ${(props) => props.selected ? `2px solid ${COLOR.BLUE2}` : `1px solid ${COLOR.N400}`};
  background-color: #FFFFFF;
  cursor: pointer;
`

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledColumn = styled(Column)`
  cursor: pointer;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`