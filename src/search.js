import React, { useState, useEffect } from "react";
import { Form, Card, Image} from "semantic-ui-react";

const Search = () => {
  const [userInput, setUserInput] = useState("example");
  const [name, setName] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [repos, setRepos] = useState();
  const [avatar, setAvatar] = useState();
  const [userName, setUserName] = useState();
  const [error, setError] = useState();
  const [link, setLink] = useState();

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  useEffect(() => {
    fetch(`https://api.github.com/users/example`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  }, []);
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  };
  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    link,
  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setLink(`https://github.com/${userInput}`);
  };
  console.log(userInput);
  return (
    <>
      <header>
        <p>github searcher</p>
      </header>
      <section>
        <div className="wrap">
          <div className="search">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Input
                  type="text"
                  className="searchTerm"
                  placeholder="Who are you looking for?"
                  onChange={handleSearch}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </section>
      <section className={"output"}>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <Card>
            <a href={link} target="_blank">
              <Image src={avatar} wrapped ui={false} />
            </a>
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <p>{followers} followers</p>
            </Card.Content>
            <Card.Content extra>
              <p>{repos} repos</p>
            </Card.Content>
            <Card.Content extra>
              <p>{following} following</p>
            </Card.Content>
          </Card>
        )}
      </section>
    </>
  );
};
export default Search;
