import { useState } from 'react';
import SortableTree, {
  toggleExpandedForAll,
  changeNodeAtPath,
  insertNode,
  removeNodeAtPath,
} from 'react-sortable-tree';
import Button from '../components/Button';

const ExampleSortableTreeFunctionComponent = () => {
  const [searchString, setSearchString] = useState('');
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [currentNode, setCurrentNode] = useState({});
  const [treeData, setTreeData] = useState([
    {
      title: 'Comic Books',
      children: [
        { title: 'Amazing Spider-Man' },
        { title: 'The Incredible Hulk' },
        { title: 'Action Comics' },
        { title: 'Batman' },
        { title: 'New Avengers' },
      ],
    },
    {
      title: 'Historical Fiction',
      children: [
        { title: 'The Help' },
        { title: 'All the Light We Cannot See' },
        { title: ' The Color Purple' },
        { title: ' War and Peace' },
      ],
    },
  ]);

  const expandAndCollapse = (expanded) => {
    setTreeData(
      toggleExpandedForAll({
        treeData: treeData,
        expanded,
      })
    );
  };

  const updateTreeData = (treeData) => {
    setTreeData(treeData);
  };

  const removeNode = (path) => {
    setTreeData(
      removeNodeAtPath({
        treeData: treeData,
        path,
        getNodeKey: ({ treeIndex }) => treeIndex,
      })
    );
  };

  const selectThis = (node, path) => {
    setCurrentNode({ currentNode: node, path: path });
  };

  const insertNewNode = () => {
    setTreeData(
      insertNode({
        treeData: treeData,
        depth: 0,
        minimumTreeIndex: treeData.length,
        newNode: { title: '', children: [] },
        getNodeKey: ({ treeIndex }) => treeIndex,
      }).treeData
    );
  };

  const getNodeKey = ({ treeIndex }) => treeIndex;

  return (
    <div style={{ height: 800 }}>
      <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
        <h2>React Sortable Tree</h2>
        {/* <Divider></Divider> */}
        <Button
          text={'Expand all'}
          size="mini"
          color="blue"
          onClick={() => {
            expandAndCollapse(true);
          }}
        >
          Expand all
        </Button>
        <Button
          text={'Collapse all'}
          size="mini"
          color="blue"
          onClick={() => {
            expandAndCollapse(false);
          }}
        >
          Collapse all
        </Button>
        &nbsp;&nbsp;&nbsp;
        <input
          size="mini"
          placeholder="Search"
          value={searchString}
          onChange={(event) => {
            console.log('Will it enter here');
            setSearchString(event.target.value);
          }}
        />
      </div>
      {/* <Divider></Divider> */}
      <SortableTree
        isVirtualized={false}
        searchQuery={searchString}
        onChange={updateTreeData}
        searchFocusOffset={searchFocusIndex}
        treeData={treeData}
        onChange={(treeData) => setTreeData(treeData)}
        generateNodeProps={({ node, path }) => ({
          title: (
            <form
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                selectThis(node, path);
              }}
            >
              <input
                style={{ fontSize: '1rem', width: 200 }}
                value={node.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setTreeData(
                    changeNodeAtPath({
                      treeData: treeData,
                      path,
                      getNodeKey,
                      newNode: { ...node, title },
                    })
                  );
                }}
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                text={'Add'}
                size="mini"
                basic
                color="blue"
                circular
                icon="add"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  insertNewNode(path);
                }}
              />
              <Button
                text={'Delete'}
                size="mini"
                basic
                color="blue"
                circular
                icon="trash"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeNode(path);
                }}
              />
            </form>
          ),
        })}
      />
      <Button
        text={' TREE DATA IN CONSOLE'}
        onClick={() => console.log('Tree data is: ', treeData)}
      ></Button>
    </div>
  );
};

export default ExampleSortableTreeFunctionComponent;
