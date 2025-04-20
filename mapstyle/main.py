# 读取 light.json 文件，提取layers中所有的id并打印出来。同时支持出入id名称，打印出对应对象的详情
import json
import os

def get_json_data(file_path):
    """
    读取 JSON 文件
    :param file_path: JSON 文件路径
    :return: JSON 数据
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def get_all_ids(data):
    """
    获取所有的 id
    :param data: JSON 数据
    :return: 所有的 id
    """
    ids = []
    for layer in data['layers']:
        if 'id' in layer:
            ids.append(layer['id'])
    return ids

def get_layer_by_id(data, layer_id):
    """
    根据 id 获取图层
    :param data: JSON 数据
    :param layer_id: 图层 id
    :return: 图层数据
    """
    for layer in data['layers']:
        if 'id' in layer and layer['id'] == layer_id:
            return layer
    return None

def main():
    # 获取当前文件的目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # 拼接 JSON 文件的路径
    json_file_path = os.path.join(current_dir, 'light.json')
    
    # 读取 JSON 数据
    data = get_json_data(json_file_path)
    
    # 获取所有的 id
    ids = get_all_ids(data)
    
    # 打印所有的 id
    print("All IDs:")
    for layer_id in ids:
        print(layer_id)
    
    # 输入 id 名称，打印对应对象的详情
    layer_id = input("请输入图层 ID：")
    layer = get_layer_by_id(data, layer_id)
    
    if layer:
        print(f"图层 {layer_id} 的详情：")
        print(json.dumps(layer, indent=4, ensure_ascii=False))
    else:
        print(f"未找到图层 ID: {layer_id}")

if __name__ == "__main__":
    main()