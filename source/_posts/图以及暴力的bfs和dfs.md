---
title: 图以及暴力的bfs和dfs
tags:
  - 算法
categories:
  - 数据结构与算法
date: 2019-07-23 09:55:07
photo:
---

{% note default %}
图与树一样是非线性的数据结构，图在表示元素与元素之间具有某种关系上有更加直观且直接的感受。
{% endnote %}

<!-- more -->

## 图的应用场景
举个例子，微信的好友关系可以用无向图表示，而像微博这样的比较复杂的关注与被关注的问题就可以用有向图来表示。

## 图的一些概念
图主要就两个：顶点和边。
因此就有了顶点的度。
无向图：因此某一个微信用户（一个顶点）有多少好友（多少度）。
有向图：某一个微博用户（一个顶点）关注了多少人（出度），被关注了多少人（入度）。

## 图在计算机中的存储方式
主要有两种，这两种，无向图和有向图都可以使用。
邻接矩阵法：主要是通过底层的二维数组来存储，通过数组下标，可以直接得到顶点与顶点之间的关系（有权重图得到权重）。
邻接表法：主要是顶点后面连接的是一条链表，有点像散列表的拉链法，**链表也可以用动态数组结构代替**。

两种存储方式各有**优缺点**：
邻接矩阵呢，查找关系很快，但是容易浪费内容空间，特别是像存储稀疏图一类的
邻接表，查找不如临界矩阵，但是可以更加充分利用空间

## 图的查找
图的查找一般是，**从某个顶点开始查找另一个顶点**。
图的查找有两种简单暴力的方法，一种是广度优先搜索（bfs），一种是深度优先搜索（dfs）

## bfs
bfs的特点就是像地毯式前进，也就是说要访问到每个顶点的最近顶点（一层一层的），直到找到目标顶点。
因此在设计bfs算法的时候，我们考虑三个东西：
- visted：visted数组存储访问过的数组，也就是说，访问过的我们不再访问，实际当中，visted很有效。
- queue：一个队列来**用作工作流水线**，我们将要处理的顶点一个一个放进queue，处理完了再一个一个出队。
- pre：pre数组就来存储每个顶点的前面的顶点，当然这个是相对于bfs查找路径上的。
bfs找出来的就是**最短路径**。

代码实现：
```
//邻接表实现无向图
class Graph
{
private:
	int v;
	vector<vector<int>> adj;
	boolean found = false;
public:
	Graph(int vv)
	{
		v = vv;
		for (int i = 0; i < vv; i++)
		{
			vector<int> vec;
			adj.push_back(vec);
		}
	}
public:
	void addEdge(int i, int j)
	{
		adj[i].push_back(j);
		adj[j].push_back(i);//vector里面可能会加入重复的边，但是在这里不考虑。
	}

//bfs
public:
	void bfs(int s, int t)//bfs
	{
		if (s == t)
		{
			cout << "circle" << endl;
			return;
		}
		vector<boolean> visted;
		for (int i = 0; i < v; i++)
		{
			visted.push_back(false);
		}
		visted[s] = true;
		queue<int> que;
		que.push(s);
		vector<int> pre;
		for (int i = 0; i < v; i++)
		{
			pre.push_back(-1);
		}
		while (que.size() != 0)
		{
			int w = que.front();
			que.pop();
			//cout << w << endl;
			for (int i = 0; i < adj[w].size(); i++)
			{
				int q = adj[w][i];
				if (!visted[q])
				{
					pre[q] = w;
					if (q == t)
					{
						print(pre, s, t);
						return;
					}
					visted[q] = true;
					que.push(q);
				}
			}
		}
	}
//打印函数
private:
	void print(vector<int> &pre, int s, int t)
	{
		if (pre[t] != -1 && t != s)
		{
			print(pre, s, pre[t]);
		}
		cout << t << " " << endl;
	}

```
看着代码，bfs就是从第一个顶点开始，将其所有的最近的顶点（邻接表链表里的没访问过的）全部加入工作流水线，并设为访问过的。

## dfs
dfs的核心思想我认为就是回溯，用走迷宫来形容最贴切不过了，当我遇到死胡同了，我就往回走。
所以递归来处理这个问题最合适不过了。

代码实现：
```
public:
	void dfs(int s, int t)
	{
		found = false;
		vector<boolean> visted;
		for (int i = 0; i < v; i++)
		{
			visted.push_back(false);
		}
		vector<int> pre;
		for (int i = 0; i < v; i++)
		{
			pre.push_back(-1);
		}
		recurDfs(s, t, visted, pre);
		print(pre, s, t);
	}

public:
	void recurDfs(int s, int t, vector<boolean> visted, vector<int> &pre)//这里要注意传的是引用
	{
		if (found == true)
		{
			return;
		}
		visted[s] = true;
		if (s == t)
		{
			found = true;
			return;
		}
		for (int i = 0; i < adj[s].size(); i++)
		{
			int q = adj[s][i];
			if (!visted[q])
			{
				pre[q] = s;
				recurDfs(q, t, visted, pre);
			}
		}
	}
};
```
dfs巧妙的地方就在于，当我访问一个顶点的所有相邻顶点的时候，发现都不是目标顶点或者是都访问过了，那么我就自动return了，然后一直往上。
dfs查出来的不一定是最短路径。
s
其实bfs和dfs虽然暴力，但是在查找路径上提供了一些比较重要的思路。










--- 

